const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

// GET requests (READ)
router.get('/', function (req, res) {
  Todo.find(function (err, output) {
    if (err) {
      console.error(err)
      return
    }
  
    res.send(output)
  })
})

router.get('/:id', function (req, res) {
  Todo.findById(req.params.id, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send('Todo with id: ' + output.name + ': ' + output.description)
  })
})

// POST requests (CREATE)
router.post('/', function (req, res) {
  Todo.create(req.body, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send(output)
  })
})

// PUT requests (UPDATE)
router.put('/:id', function (req, res) {
  Todo.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  }, {new: true}, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send(output)
  })
})

// DELETE requests (DESTROY)
router.delete('/:id', function (req, res) {
  Todo.findByIdAndRemove(req.params.id, function (err, output) {
    if (err) {
      console.error(err)
      return
    }
    res.send('Success deleting todo: ' + output)
  })
})

module.exports = router
