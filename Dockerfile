FROM nginx:alpine

# Copia o build do front-end
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 🔥 Redireciona logs para stdout/stderr (para aparecer no Portainer)
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

# Expõe a porta
EXPOSE 80

# Mantém o Nginx rodando
CMD ["nginx", "-g", "daemon off;"]
