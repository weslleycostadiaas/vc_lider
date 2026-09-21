# Plano: capa e página do vídeo

## Objetivo
Transformar o convite do e-mail em uma experiência visual: uma capa ilustrativa clicável leva a uma página própria, onde o usuário assiste ao vídeo.

## O que será construído
- Criar uma capa ilustrativa sóbria, alinhada às cores do Radar do Líder.
- Trocar a capa genérica do e-mail pela imagem, com link para a nova página.
- Criar uma página dedicada ao vídeo, com a capa em destaque e reprodução incorporada.
- Adicionar um botão principal “Reproduzir vídeo” que inicia o vídeo na própria página.
- Manter o link direto do Vimeo como alternativa caso a reprodução incorporada seja bloqueada.
- Ajustar a experiência para celular e computador.

## Detalhes técnicos
- A nova página será uma rota pública com metadados próprios.
- A capa será hospedada como imagem pública para aparecer em leitores de e-mail.
- O clique no e-mail abrirá a página publicada do projeto, não o player isolado do Vimeo.
- O player será carregado apenas depois da ação do usuário, com autoplay solicitado pelo botão.
