// TO START AN EXPRESS SERVER:
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://jonathanlimes:iamusingthisformymlabproject@ds149069.mlab.com:49069/tododb')
mongoose.Promise = global.Promise

const todoController = require('./controllers/todoController')
const bodyParser = require('body-parser') // to request for POST data

app.use(bodyParser.json())
app.use('/todos', todoController)

// TO LISTEN IN TO A PORT. PUT THIS AT THE BOTTOM OF EVERYTHING
const port = process.env.PORT || 4000
app.listen(port, function () {
  console.log('Local todo list is running on port ' + port)
})
