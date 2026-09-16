# Protótipo de homepage — Colégio SOMA

Este pacote implementa uma homepage institucional responsiva com base no briefing fornecido e nos documentos de branding/persona do Colégio SOMA.

## Arquivos

- `index.html` — estrutura semântica, copy em PT-BR, JSON-LD básico e todas as seções da homepage.
- `styles.css` — sistema visual responsivo, usando a paleta do SOMA.
- `script.js` — menu móvel, tabs acessíveis, protótipo de formulário, captura de UTMs e eventos preparados para `dataLayer`.
- `assets/` — logotipo e grafismos extraídos do manual fornecido pelo usuário, além de versões WebP.
- `robots.txt` e `sitemap.xml` — preparados para receber o domínio oficial.

## Pontos que NÃO foram inventados

O protótipo mantém marcadores `[VALIDAR COM O SOMA]` para dados que precisam ser confirmados antes da publicação, incluindo:

1. grafia oficial de “Vila” ou “Villa”;
2. endereço, telefone/WhatsApp e horários de cada unidade;
3. oferta atual de etapas e séries por unidade;
4. disponibilidade atual de período integral;
5. infraestrutura e parceria bilíngue da Garden;
6. fotos reais autorizadas;
7. depoimentos, avaliações e resultados reais;
8. documentos de matrícula;
9. Política de Privacidade e Termos de Uso;
10. domínio oficial e URLs canônicas;
11. prazo real de retorno após envio do formulário.

## Tipografia

O briefing pede Hanson Bold nos títulos apenas se arquivo/licença web forem fornecidos, e Poppins nos demais textos. Como os arquivos de fonte não foram fornecidos, este protótipo usa fallbacks de sistema e deixa a substituição pronta no topo de `styles.css`.

## Publicação

Antes de publicar, é necessário conectar o formulário a um backend/CRM seguro, configurar WhatsApp/rotas, inserir os dados oficiais de cada unidade, configurar GTM/GA4, preencher canonical/OG URLs, completar o JSON-LD de cada unidade com endereço/telefone/horários validados e revisar a Política de Privacidade.

## Checklist final

### SEO
- [x] único H1 e hierarquia H2/H3
- [x] title e meta description
- [x] Open Graph/Twitter básico
- [x] conteúdo local natural (Abrantes/Estrada do Coco/Camaçari)
- [x] JSON-LD válido sem inventar endereço/telefone
- [ ] canonical após domínio oficial
- [ ] sitemap com URLs reais
- [ ] páginas próprias para cada unidade, se entrarem no escopo

### Acessibilidade
- [x] skip link
- [x] navegação por teclado
- [x] foco visível
- [x] tabs com ARIA e teclado
- [x] acordeões nativos (`details/summary`)
- [x] labels de formulário
- [x] mensagens de erro/sucesso
- [x] `prefers-reduced-motion`
- [x] nenhuma informação essencial depende apenas de hover
- [ ] validar contraste e leitura com conteúdo/fotos finais

### Performance
- [x] sem frameworks ou bibliotecas pesadas
- [x] JS pequeno e progressivo
- [x] assets WebP para logo/grafismo
- [x] layout mobile-first/responsivo
- [ ] converter fotos finais para AVIF/WebP, definir dimensões e lazy loading abaixo da dobra
- [ ] medir LCP, INP e CLS na hospedagem real

### Mensuração preparada
Eventos emitidos para `window.dataLayer`, se ele existir:
- `clique_agendar_visita`
- `clique_whatsapp`
- `selecao_unidade`
- `selecao_segmento`
- `envio_formulario`
- `formulario_sucesso`

Também há armazenamento temporário das UTMs em `sessionStorage`, sem armazenar dados pessoais.
