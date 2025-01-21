FROM nginx:alpine

COPY . /usr/share/nginx/html/

# Altere a configuração padrão para usar a porta 8089
RUN sed -i 's/listen 80;/listen 8089;/' /etc/nginx/conf.d/default.conf

EXPOSE 8089
CMD ["nginx", "-g", "daemon off;"]
