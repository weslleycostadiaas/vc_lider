# Plano: tela completa de resultado do Radar do Líder

## Objetivo
Reproduzir a tela “Seu diagnóstico” conforme as quatro imagens enviadas, mantendo intactos o questionário, as respostas e o cálculo atual.

## O que será construído
- Reorganizar o resultado em uma página longa, clara e centralizada, com o mesmo ritmo visual da referência.
- Exibir no topo a nota geral, a classificação e a descrição correspondente.
- Criar o bloco “Seu Radar M.A.P.A.” com gráfico radar dos quatro pilares e a frase editorial ao lado.
- Criar quatro cartões de detalhes, cada um com nota, faixa, barra de progresso, ícone e descrição.
- Destacar “Pilar crítico” e “Ponto forte” em cartões próprios.
- Mostrar a régua das três classificações, destacando a faixa atual.
- Reproduzir o bloco bloqueado de análise e vídeo, seguido do texto de orientação.
- Manter o formulário de nome, e-mail, WhatsApp e consentimento com a mesma hierarquia das imagens.
- Manter a confirmação “Depois de enviar” no fim da página.
- Ajustar tudo para celular e computador sem alterar a lógica de envio existente.

## Detalhes técnicos
- Usar os resultados já calculados em `src/lib/radar.ts` como fonte das notas e classificações.
- Implementar o radar com SVG responsivo e acessível, sem imagem estática.
- Acrescentar descrições dos pilares e estados visuais sem mudar as 12 perguntas.
- Reusar a paleta bege, vinho e terracota existente, ampliando apenas os tokens semânticos necessários.
- Validar o fluxo completo das 12 respostas até o resultado em tela pequena e grande.

## Observação
A URL do Claude enviada retorna “Page not found”; as imagens serão a referência visual principal.
