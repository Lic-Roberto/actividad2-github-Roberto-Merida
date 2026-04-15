const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('API funcionando');
});

app.get('/usuario', (req, res) => {
  const usuario = {
    grupo: "2-1",
    nombre: 'Roberto Jesus Merida Cazares'
  };

  res.json(usuario);
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});