require('dotenv').config();
const express = require('express');

const app = express();

app.use(express.json());

const APP_ENV = process.env.APP_ENV || 'local';

// Endpoint de prueba
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: APP_ENV,
    message: 'Practica 5 – API funcionando',
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API escuchando en puerto ${PORT} (env=${APP_ENV})`);
});
