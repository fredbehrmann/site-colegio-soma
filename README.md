# Protótipo de homepage — Escola SOMA

Este pacote implementa uma homepage institucional responsiva com base no briefing fornecido e nos documentos de branding/persona da Escola SOMA.

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

## Imagens a fornecer

O layout possui oito espaços fotográficos numerados. Todas as imagens devem ser reais, luminosas, espontâneas, em alta resolução e ter autorização adequada de uso de imagem. Evitar poses excessivamente publicitárias, marcas de terceiros e dados pessoais visíveis.

1. **Imagem 01 — foto principal:** aluno e educador interagindo em uma situação real de aprendizagem. Preferir enquadramento horizontal, com respiro ao redor das pessoas para os recortes responsivos.
2. **Imagem 02 — unidade SOMA Vila:** fachada, entrada ou ambiente marcante que identifique claramente a unidade. Preferir enquadramento horizontal, boa luz e espaço organizado.
3. **Imagem 03 — unidade SOMA Garden:** ambiente externo com área verde e crianças utilizando o espaço. Preferir enquadramento horizontal que mostre a integração com a natureza.
4. **Imagem 04 — atividades em sala:** alunos e professor em uma aula participativa, mostrando troca, curiosidade e proximidade. Esta imagem ocupa o maior quadro do mosaico e deve funcionar também em recorte vertical.
5. **Imagem 05 — arte e expressão:** atividade de artes visuais, música, teatro, dança ou outra produção criativa dos estudantes.
6. **Imagem 06 — esporte e convivência:** prática esportiva, brincadeira coletiva ou momento de integração entre estudantes.
7. **Imagem 07 — projetos pedagógicos:** experimento, feira, apresentação ou trabalho prático que mostre os alunos como protagonistas.
8. **Imagem 08 — eventos com as famílias:** familiares e estudantes participando de uma celebração, encontro ou atividade promovida pela escola. Preferir enquadramento horizontal mais aberto.

Para preservar a qualidade em telas grandes, recomenda-se enviar os arquivos originais em JPEG ou HEIC com pelo menos 2400 px no lado maior. A versão publicada deve ser exportada em AVIF/WebP e receber recortes responsivos quando necessário.

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
