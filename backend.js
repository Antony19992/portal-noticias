const express = require('express');
const axios = require('axios');
const app = express();

const RSS_URL = 'https://g1.globo.com/rss/g1/brasil/';

app.get('/proxy-rss', async (req, res) => {
    try {
        const response = await axios.get(RSS_URL);
        res.set('Content-Type', 'application/xml');
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Erro ao buscar o RSS.');
    }
});

app.listen(3000, () => {
    console.log('Servidor proxy rodando em http://localhost:3000');
});
