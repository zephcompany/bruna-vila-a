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

Os botões de **Treinamento In Company** e **Mentoria** falam com a Bruna no número pessoal **+55 (31) 99365-6921**; os da home, **Consultoria** e **R&S + NR-1** falam com o Instituto, **+55 (49) 99966-5854** (registrado no WhatsApp sem o nono dígito, como no link oficial wa.me/message/Y6B2KJXDEZ4KJ1). Os números e os Instagrams ficam em `site.config.json`. Cada serviço tem uma mensagem específica pré-preenchida. O visitante confirma e envia a mensagem no WhatsApp; o site não envia mensagens automaticamente.

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
- Fotografias em `dist/assets/fotos/` (33 imagens, `.webp`) enviadas pela cliente em outubro de 2026: ensaio no consultório, ambiente do Instituto, parede de certificações, livro *The Duetto Experience* e atendimento em loja de varejo premium. O mapeamento por seção fica em `generate.mjs` (`heroPhotos`, `painPhotos`, `services`, `authority`, `space`, `cases`).
- As fotos anteriores do Instagram (`bruna-treinamento.jpg`, `bruna-encontro.jpg`, `bruna-equipe.jpg`) e o retrato `bruna-vilaca.webp` permanecem em `dist/assets` mas não são mais usadas nas páginas.
- Ornamentos e cantoneiras vetoriais criados para a identidade do site. As fotografias são servidas localmente, sem dependência do Instagram.
- [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond), [Manrope](https://fonts.google.com/specimen/Manrope) e [Pinyon Script](https://fonts.google.com/specimen/Pinyon+Script): Google Fonts, SIL Open Font License.

## Verificações

A verificação de conteúdo cobre as cinco páginas, 315 trechos da copy, 145 referências internas e 16 perguntas frequentes. Também foram verificados o menu, a navegação, os destinos dos CTAs, imagens e a apresentação em desktop e celular. Os resultados esperados, posicionamento e afirmações comerciais foram preservados conforme o texto enviado.

## Revisão visual

A home ganhou, em outubro de 2026, a seção **O Instituto · Maravilha-SC** (galeria do espaço), um mosaico de certificações abaixo da autoridade e fotos de atendimento em varejo premium na seção de resultados. As páginas de serviço têm uma foto no bloco **O cenário**. A frase do hero passou a ser “Gente & Gestão nunca foi custo. Sempre foi o ativo que sustenta o resultado.”

A revisão neoclássica aplica molduras douradas, cantoneiras com folhas, florões simétricos, textura ornamental discreta e fundos em marfim. As imagens ilustrativas foram substituídas por fotos reais de Bruna e do Instituto. A chamada final da home foi alterada, a pedido da cliente, para “O valor não é nada”.

`dist/assets/neoclassical.css` reúne os estilos da revisão. O gerador preserva os demais textos e destinos dos botões.
