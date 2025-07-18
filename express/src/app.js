// importacion del modulo de express
const express = require('express')
// creacion de una aplicación en express
const app = express()
// puerto que va escuchar el servidor
const PORT = 3000

app.get('/', (req, res) => {
  res.send('Hola Mundo')
})

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`)
})
