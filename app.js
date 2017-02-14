// TO START AN EXPRESS SERVER:
const express = require('express')
const app = express()

const mongoose = require('mongoose')
mongoose.connect('mongodb://jonathanlimes:iamusingthisformymlabproject@ds149069.mlab.com:49069/tododb')
mongoose.Promise = global.Promise

const todoController = require('./controllers/todoController')
const bodyParser = require('body-parser') // to request for POST data

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use('/todos', todoController)
app.use(function (err, req, res, next) {
  res.send({
    error: err.message
  })
})

// TO LISTEN IN TO A PORT. PUT THIS AT THE BOTTOM OF EVERYTHING
const port = process.env.PORT || 4000
var server = app.listen(port, function () {
  console.log('Local todo list is running on port ' + port)
})

module.exports = server
