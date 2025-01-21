# Portal de Notícias

Este projeto utiliza Docker para criar e executar um contêiner NGINX que hospeda o portal de notícias.

## Passos para criar e executar o contêiner

### 1. Criar a imagem
Execute o seguinte comando para criar a imagem Docker:

```bash
docker build -t portal-noticias .
```

Depois de criar a imagem, execute o seguinte comando para iniciar o contêiner:

```bash
docker run -d -p 8089:8089 --name noticias-container portal-noticias
```