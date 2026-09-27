# Instituto Bruna Vilaça

Site institucional com home e quatro páginas de serviço, seguindo a copy fornecida. Identidade em bordô, creme e dourado; logo extraída do panfleto; Cormorant Garamond, Pinyon Script e Manrope.

## Visualizar e hospedar

O site também é publicado no [GitHub Pages](https://zephcompany.github.io/bruna-vila-a/index.html). A cada envio para `main`, o workflow `.github/workflows/pages.yml` gera e verifica as cinco páginas, prepara os caminhos para `/bruna-vila-a/` e publica o `index.html`.

Para preparar essa versão localmente, execute `node generate.mjs`, `node check.mjs` e `node prepare-pages.mjs`. A pasta `.pages` contém o resultado para GitHub Pages; `dist` continua disponível para hospedagens na raiz de um domínio.

A pasta `dist` contém o site pronto. Sirva essa pasta com qualquer hospedagem estática que suporte `index.html` por diretório.

Para abrir localmente, dentro desta pasta:

```sh
python3 -m http.server 4173 --directory dist
```

Acesse `http://localhost:4173`. Use um servidor local; abrir o HTML diretamente pelo Finder não resolve os caminhos das páginas e dos arquivos.

## Editar

- `content.json`: copy organizada por página e seção, na ordem do documento original.
- `site.config.json`: WhatsApp, imagem da hero e cases.
- `generate.mjs`: estrutura das cinco páginas.
- `dist/assets/styles.css`: identidade visual, estilos responsivos e animações.
- `dist/assets/main.js`: menu móvel, dropdown, revelação suave e progresso de leitura.
- `dist/assets/fonts.css`: fontes locais, sem dependência de Google Fonts em tempo de execução.

Depois de editar a copy, o gerador ou a configuração:

```sh
node generate.mjs
node check.mjs
```

Nenhuma instalação de pacotes é necessária. O JavaScript no navegador é progressivo; os textos, links e FAQs são HTML nativo.

## Trocar a foto da hero

1. Coloque a imagem final em `dist/assets`, por exemplo `bruna-hero.webp`.
2. Altere `heroImage` em `site.config.json` para `/assets/bruna-hero.webp`.
3. Execute `node generate.mjs`.

A foto atual foi fornecida pela cliente. No desktop, fica à direita; no celular, aparece abaixo do texto. O enquadramento fica em `.portrait-frame img`, no CSS. A mesma imagem configurável aparece na mentoria. A seção de autoridade usa `bruna-vilaca.webp` de forma independente.

## WhatsApp

Todos os botões comerciais usam **+55 (49) 99966-5854**, extraído do panfleto. Cada serviço tem uma mensagem específica pré-preenchida. O visitante confirma e envia a mensagem no WhatsApp; o site não envia mensagens automaticamente.

## Cases e certificações

O documento não trouxe depoimentos aprovados, nomes de clientes ou certificados individuais. Foram preservados os textos da seção e a informação de +25 certificações, sem criar resultados, empresas ou credenciais fictícias.

Quando os cases forem aprovados, adicione-os ao campo `cases` da configuração e execute o gerador. Formato de cada item:

```json
{
  "sector": "Setor do cliente",
  "title": "Título aprovado do case",
  "text": "Texto autorizado com contexto, desafio e entrega."
}
```

Os exemplos acima são instruções de edição e não aparecem no site. A lista inicial está vazia.

## Páginas

- `/`
- `/treinamento-in-company/`
- `/consultoria-processos-pessoas/`
- `/recrutamento-nr1/`
- `/mentoria-wellness-corporate/`

## Créditos

- Logo e retrato: materiais fornecidos pela cliente.
- Imagem de arquitetura: extraída do panfleto fornecido pela cliente.
- Foto ilustrativa de escuta e documentos: [Mikhail Nilov / Pexels](https://www.pexels.com/photo/two-women-reading-a-document-in-the-office-8101499/).
- Foto ilustrativa de treinamento: [fauxels / Pexels](https://www.pexels.com/photo/group-of-people-gathered-around-wooden-table-3184360/).
- Foto ilustrativa de reunião estratégica: [Mikhail Nilov / Pexels](https://www.pexels.com/photo/a-group-of-people-having-a-meeting-in-the-office-6592746/).
- Fotos de stock sob [licença Pexels](https://www.pexels.com/license/); não representam clientes ou integrantes do Instituto.
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Manrope](https://fonts.google.com/specimen/Manrope) e [Pinyon Script](https://fonts.google.com/specimen/Pinyon+Script): Google Fonts, SIL Open Font License.

## Verificações

A verificação de conteúdo cobre as cinco páginas, 315 trechos da copy, 127 referências internas e 16 perguntas frequentes. Também foram verificados o menu, a navegação, os destinos dos CTAs, imagens e a apresentação em desktop e celular. Os resultados esperados, posicionamento e afirmações comerciais foram preservados conforme o texto enviado.

## Revisão visual

A home inclui uma composição de arquitetura e retrato na hero, fotografia editorial no conceito, imagem de análise conjunta no método, quatro linhas de serviço com fotografia e um fechamento sobre arquitetura. Todas as fotografias de stock são ilustrativas. A copy e os destinos dos botões foram preservados.
