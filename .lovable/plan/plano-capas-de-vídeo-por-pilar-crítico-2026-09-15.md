# Plano: capas de vídeo por pilar crítico

## Objetivo
Mostrar automaticamente a capa correspondente ao pilar crítico identificado no diagnóstico: Mentalidade, Ação, Pessoas ou Aprendizado Contínuo.

## O que será alterado
- Hospedar as quatro imagens enviadas como capas oficiais dos pilares.
- No e-mail, escolher a capa conforme o pilar crítico e apontar o clique para a página do vídeo com esse pilar identificado.
- Na página do vídeo, ler o pilar recebido no link e exibir a mesma capa correspondente.
- Manter uma capa padrão caso o link seja aberto sem um pilar válido.
- Preservar o player, os dois botões atuais e todos os demais conteúdos.

## Detalhes técnicos
- O pilar será enviado na URL da página do vídeo como parâmetro seguro.
- Um único mapa compartilhado relacionará cada nome de pilar à imagem correta, evitando divergências entre e-mail e página.
- A capa usada no e-mail terá URL pública absoluta para funcionar nos leitores de e-mail.
- A página aceitará também nomes com acentos e espaços por meio da codificação da URL.

## Verificação
- Confirmar no HTML de cada resultado que a imagem e o link correspondem ao pilar crítico.
- Conferir a página do vídeo em computador e celular para os quatro pilares.
