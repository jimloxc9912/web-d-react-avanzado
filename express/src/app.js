/* inicia app.js
require('dotenv').config()
// console.log(process.env.PORT)
// console.log(process.env.NOMBRE)
// Importamos el módulo de Express
const express = require('express')
const { infoPeliculas } = require('./peliculas')

// Creamos una aplicación de Express
const app = express()

// Definimos el puerto que va a escuchar el servidor
const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/api/peliculas', (req, res) => {
  res.send(infoPeliculas)
})

app.get('/api/peliculas/accion/titulo/:titulo/:year', (req, res) => {
  /* const titulo = req.params.titulo
  const year = req.params.year
  const { titulo, year } = req.params
  const resultados = infoPeliculas.accion.filter(pelicula => pelicula.titulo === titulo && pelicula.year === Number(year))

  if (resultados.length === 0) {
    return res.status(400).send(`No se encontraron resultados para ${titulo} en el año ${year}`)
  }

  res.send(resultados)
})

app.get('/api/peliculas/comedia/:pais', (req, res) => {
  const pais = req.params.pais
  const resultados = infoPeliculas.comedia.filter(pelicula => pelicula.pais === pais)

  if (req.query.ordenar === 'year') {
    return res.send(resultados.sort((a, b) => b.year - a.year))
  }

  res.send(resultados)
})

app.use(express.json())
app.post('/api/peliculas', (req, res) => {
  const nuevaPelicula = req.body
  console.log(nuevaPelicula)
  res.status(201).send({
    mensaje: 'Pelicula creada con éxito',
    datos: nuevaPelicula
  })
})
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
*/

// express y dotenv con ESModules clase 6

import express from 'express'
import dotenv from 'dotenv'
import fs from 'fs'

dotenv.config()

// 2. crear la aplicacion de express

const app = express()
const PORT = process.env.PORT
// Funcion que lee la informacion de deb.json
const readData = () => {
  try {
    const data = fs.readFileSync('./src/db.json')
    return JSON.parse(data)
  } catch (error) {
    console.error(error)
  }
}
console.log(readData())
readData()

// Función que escribe dentro de db.json
const writeData = (data) => {
  try {
    fs.writeFileSync('./src/db.json', JSON.stringify(data))
  } catch (error) {
    console.error(error)
  }
  // return JSON.stringify(data)
}
app.get('/', (req, res) => {
  res.send('Hola mundo')
})

app.get('/peliculas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const result = readData().accion.find(pelicula => pelicula.id === id)
  res.json(result)
})

app.use(express.json())
app.post('/peliculas', (req, res) => {
  const data = readData()
  const body = req.body
  const newMovie = {
    id: data.accion.length + 1,
    ...body
  }
  data.accion.push(newMovie)
  writeData(data)
  res.json(newMovie)
})

app.put('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const body = req.body
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion[peliculaIndex] = {
    ...data.accion[peliculaIndex],
    ...body
  }
  writeData(data)
  res.json({ message: 'Pelicula actualizada correctamente' })
})

app.delete('/peliculas/:id', (req, res) => {
  const data = readData()
  const id = parseInt(req.params.id)
  const peliculaIndex = data.accion.findIndex(movie => movie.id === id)
  data.accion.splice(peliculaIndex, 1)
  writeData(data)
  res.json({ message: 'Pelicula eliminada correctamente' })
})

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})
