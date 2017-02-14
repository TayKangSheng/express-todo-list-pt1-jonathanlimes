// Mongoose Schema and Models goes here
const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'No name for todo'],
    minlength: [5, 'Name for todo short']
  },
  description: {
    type: String,
    default: 'I love descriptions!'
  },
  completed: {
    type: Boolean,
    default: false
  }
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = Todo
