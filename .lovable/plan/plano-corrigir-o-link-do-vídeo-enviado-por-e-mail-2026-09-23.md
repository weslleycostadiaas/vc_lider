# Plano: corrigir o link do vídeo enviado por e-mail

## Objetivo
Garantir que todo novo e-mail abra a análise em `https://radar.julienesalvan.com.br/video?pilar=...`, sem usar o endereço do Lovable.

## Alterações
- Manter o endereço correto dentro do HTML completo do e-mail.
- Enviar o mesmo endereço em campos explícitos e compatíveis no webhook, evitando que o modelo do n8n reutilize um campo antigo.
- Verificar o conteúdo do payload para cada um dos quatro pilares.

## Observação
O código atual já gera o endereço correto. Se o e-mail continuar com o endereço antigo após esta alteração, ele estará fixado diretamente no fluxo/modelo do n8n e precisará ser substituído lá pelo campo recebido no webhook.
