
const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')
app.use(cors())// permite que cualquier origen funciones nuestra appi, se puede configurar
app.use(express.json())// la request, soportara cuando se le pasa un objeto
// y lo paseara para tenerlo disponible en el post que usares
// const http = require('http');

app.use(logger)

let notes = [
  {
    id: 1,
    content: 'contenido 1 para todos',
    date: '2019-05-30T17:30:31.0982',
    important: true
  },
  {
    id: 2,
    content: 'contenido 2',
    date: '2019-05-50T17:30:31.091Z',
    important: false
  },
  {
    id: 3,
    content: 'contenido 4',
    date: '2019-05-40T17:30:31.980Z',
    important: true
  }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  // const id = request.params  -> tomamos un trozo de la URL
  const id = Number(request.params.id) // siempre llegara un sting
  // console.log(id)

  // console.log(request.params)
  const note = notes.find(note => note.id === id)// con el id que le doy en la url el
  // buscara en el array el elemento que tenga ese mismo id y con el .find me retornara
  // ese elemento solicidato, pero necesito resibirlo en JSON
  // console.log({note})
  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id) // siempre llegara un sting
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body // osea el contenido del body
  // que le envio a traves del testeador de apis

  if (!note || !note.content) {
    return response.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }

  notes = notes.concat(newNote)

  response.status(201).json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Not Found'
  })
})

const PORT = 3001
app.listen(PORT, () => { // es asincrono entonces asi verifico qeu si haya cargado
  console.log(`server runing on port ${PORT}`)
})
