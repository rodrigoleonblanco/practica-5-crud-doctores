require('dotenv').config();
const express = require('express');
const { connectDB } = require('./db');
const doctorsRouter = require('./routes/doctors');

const app = express();

app.use(express.json());

const APP_ENV = process.env.APP_ENV || 'local';

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    env: APP_ENV,
    message: 'Practica 5 – API funcionandoo',
  });
});

app.use('/doctores', doctorsRouter); 

const PORT = process.env.PORT || 3000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`API escuchando en puerto ${PORT} (env=${APP_ENV})`);
  });
});
