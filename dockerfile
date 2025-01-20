# Usar a imagem oficial do Nginx
FROM nginx:alpine

# Copiar os arquivos do projeto para o diretório padrão do Nginx
COPY . /usr/share/nginx/html

# Expor a porta 80 para acessar o servidor
EXPOSE 80

# Comando padrão para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]
