import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const basePath = (process.env.PAGES_BASE_PATH ?? '/bruna-vila-a').replace(/\/$/, '');
if (basePath && !/^\/[a-zA-Z0-9_/-]+$/.test(basePath)) {
  throw new Error('PAGES_BASE_PATH deve ser um caminho absoluto, sem domínio.');
}
const output = path.join(root, '.pages');
fs.rmSync(output, { recursive: true, force: true });
fs.cpSync(path.join(root, 'dist'), output, { recursive: true });

function filesIn(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const file = path.join(directory, entry.name);
    return entry.isDirectory() ? filesIn(file) : [file];
  });
}

const files = filesIn(output);
for (const file of files) {
  if (!/\.(html|css)$/.test(file)) continue;
  let text = fs.readFileSync(file, 'utf8');
  if (file.endsWith('.html')) {
    text = text.replace(/\b(href|src)="\/(?!\/)/g, `$1="${basePath}/`);
  } else {
    text = text.replace(/url\((['"]?)\/(?!\/)/g, `url($1${basePath}/`);
  }
  fs.writeFileSync(file, text);
}
fs.writeFileSync(path.join(output, '.nojekyll'), '');

// Validate the published paths, including nested pages, anchors and font files.
let checked = 0;
for (const file of files.filter(file => /\.(html|css)$/.test(file))) {
  const text = fs.readFileSync(file, 'utf8');
  const references = file.endsWith('.html')
    ? [...text.matchAll(/(?:href|src)="([^"]+)"/g)].map(match => match[1])
    : [...text.matchAll(/url\(['"]?([^'"\s)]+)['"]?\)/g)].map(match => match[1]);
  const current = new URL(`${basePath}/${path.relative(output, file)}`, 'https://pages.local');
  for (const reference of references) {
    if (/^(?:[a-z]+:|\/\/)/i.test(reference)) continue;
    const url = new URL(reference, current);
    if (!url.pathname.startsWith(`${basePath}/`)) throw new Error(`Caminho fora do site: ${reference}`);
    let target = path.join(output, url.pathname.slice(basePath.length));
    if (url.pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!fs.existsSync(target)) throw new Error(`Arquivo ausente: ${reference}`);
    if (url.hash && !fs.readFileSync(target, 'utf8').includes(`id="${url.hash.slice(1)}"`)) {
      throw new Error(`Âncora ausente: ${reference}`);
    }
    checked++;
  }
}
console.log(`GitHub Pages preparado em .pages: ${checked} referências verificadas em ${basePath || '/'}.`);
