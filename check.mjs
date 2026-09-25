import fs from 'node:fs';
import path from 'node:path';
const root=new URL('./dist/',import.meta.url);const base=path.resolve(root.pathname);
const pages=['','treinamento-in-company','consultoria-processos-pessoas','recrutamento-nr1','mentoria-wellness-corporate'];
const data=JSON.parse(fs.readFileSync(new URL('./content.json',import.meta.url)));
const decode=s=>s.replace(/<[^>]*>/g,' ').replaceAll('&amp;','&').replaceAll('&quot;','"').replaceAll('&lt;','<').replaceAll('&gt;','>');
const norm=s=>s.replace(/\s+/g,' ').trim();
let issues=[];let links=0;let sentences=0;
for(let i=0;i<pages.length;i++){
const file=new URL(`${pages[i]?pages[i]+'/':''}index.html`,root);const html=fs.readFileSync(file,'utf8');const text=norm(decode(html));
if((html.match(/<h1>/g)||[]).length!==1)issues.push(`${pages[i]}: invalid h1`);
for(const [sec,lines] of Object.entries(data[i])){if(sec==='00')continue;for(let line of lines){if(sec==='01'&&line.includes('   ·   ')){for(const piece of line.split('·')){sentences++;if(!text.includes(norm(piece)))issues.push(`Missing: ${piece}`);}continue;}line=norm(line.replace(/^[·◆]\s*/,'').replace(/^\d{2}\s+/,'').replace(/\s*→$/,''));sentences++;if(!text.includes(line))issues.push(`${pages[i]||'home'} missing: ${line}`);}}
for(const m of html.matchAll(/(?:href|src)="([^"]+)"/g)){let url=m[1];if(!url.startsWith('/')&&!url.startsWith('#'))continue;links++;const [pathname,hash]=url.split('#');const route=pathname||`/${pages[i]?pages[i]+'/':''}`;let target=path.join(base,route);if(route.endsWith('/'))target=path.join(target,'index.html');if(!fs.existsSync(target))issues.push(`Broken asset/route: ${url} from ${pages[i]}`);else if(hash&&!fs.readFileSync(target,'utf8').includes(`id="${hash}"`))issues.push(`Broken anchor: ${url}`);}
if(i&&(html.match(/<details /g)||[]).length!==4)issues.push(`${pages[i]}: FAQ missing`);
if(/🖼|📸|\[ BOTÃO|undefined|NaN/.test(html))issues.push(`${pages[i]} contains placeholders`);
}
if(issues.length){console.error(issues.join('\n'));process.exit(1);}console.log(`OK: 5 páginas, ${sentences} trechos da copy, ${links} links/assets internos, 16 FAQs.`);
