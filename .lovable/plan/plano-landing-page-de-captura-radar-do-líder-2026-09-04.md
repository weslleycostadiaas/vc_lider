# Plano: Landing Page de Captura — Radar do Líder

## Objetivo
Construir a página inicial (`/`) como landing page de captura mobile-first, escura, com uma única ação central (botão "Começar meu diagnóstico"), sem menu de navegação e sem links distractores.

## O que será feito

1. **Ajustar o design system para a paleta exclusivamente escura**
   - Sobrescrever `:root` para usar o fundo gradiente bordô, texto creme e terracota como ação.
   - Adicionar tokens customizados: `--lead-bordo-top`, `--lead-bordo-mid`, `--lead-bordo-bottom`, `--lead-terracotta`, `--lead-terracotta-hover`, `--lead-cream`, `--lead-cream-muted`, `--lead-card`, `--lead-border`.
   - Manter apenas o tema escuro (sem versão clara).

2. **Carregar as fontes do Google Fonts**
   - `Bebas Neue` para headline e títulos de seção.
   - `Space Mono` para rótulos, selos e assinatura do rodapé.
   - `Playfair Display` em itálico para o slogan do rodapé.
   - `IBM Plex Sans` para corpo, subtítulo, passos e credibilidade.
   - Incluir os links no `head` de `src/routes/__root.tsx`.

3. **Substituir o placeholder da página inicial**
   - Em `src/routes/index.tsx`, remover o placeholder e criar a landing page completa.
   - Estrutura de cima para baixo:
     - Rótulo em pílula: "Radar do Líder · Diagnóstico gratuito de liderança".
     - Headline centralizada em Bebas Neue.
     - Subtítulo em IBM Plex Sans com opacidade reduzida.
     - Botão grande arredondado terracota com sombra suave, apontando para link temporário.
     - Microcopy abaixo do botão.
     - Três selos em pílulas com ícones simples (Lucide).
     - Faixa de autoridade com placeholder circular para foto e texto.
     - Seção "Como funciona" com título e 3 cards numerados.
     - Repetir o botão CTA ao final.
     - Rodapé centralizado com assinatura e slogan.

4. **SEO e metadados da página**
   - Adicionar `head()` em `src/routes/index.tsx` com título, descrição, Open Graph e Twitter Card específicos da landing page.

5. **Responsividade e refinamento visual**
   - Layout em coluna centralizada, otimizado para celular, com respiro generoso.
   - Botão com destaque forte, sombra suave e transição de hover.
   - Cards com superfície bordô mais claro e bordas sutis.

## Arquivos que serão alterados
- `src/styles.css`
- `src/routes/__root.tsx`
- `src/routes/index.tsx`

## Não será feito nesta etapa
- Funcionalidade real do diagnóstico (o botão usará link temporário).
- Integração com backend ou captura de leads.
- Substituição do placeholder de foto por imagem real.
