const express = require('express')
const router = express.Router()

const Todo = require('../models/todo')

// GET requests (READ)
router.get('/', function (req, res, next) {
  Todo.find(function (err, output) {
    if (err) {
      return next(err)
    }

    res.send(output)
  })
})

// RENDER ON INDEX.EJS
router.get('/index', function (req, res, next) {
  Todo.find({}, function (err, output) {
    if (err) {
      return next(err)
    }
    res.render('./todos/index', {
      allTodos: output
    })
  })
})

router.get('/:id', function (req, res, next) {
  Todo.findById(req.params.id, function (err, output) {
    if (err) {
      return next({message: 'Todo ID not valid'})
    }
    res.send(output)
  })
})

router.get('/index/:id', function (req, res, next) {
  Todo.findById(req.params.id, function (err, output) {
    if (err) {
      return next(err)
    }
    res.render('./todos/show', {
      allTodos: output
    })
  })
})

// POST requests (CREATE)
router.post('/', function (req, res, next) {
  Todo.create(req.body, function (err, output) {
    if (err) {
      res.status(422).send({msg: 'Could not create todo because:' + err})
      return next({message: 'Todo post error'})
    }
    res.redirect('/')
  })
})

// PUT requests (UPDATE)
router.put('/:id', function (req, res, next) {
  Todo.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    completed: req.body.completed
  }, {new: true}, function (err, output) {
    if (err) {
      return next({message: 'Todo ID not valid. Update failed'})
    }
    res.send(output)
  })
})

// DELETE requests (DESTROY)
router.delete('/:id', function (req, res, next) {
  Todo.findByIdAndRemove(req.params.id, function (err, output) {
    if (err) {
      return next({message: 'Todo ID not valid. Delete failed'})
    }
    res.send({msg: 'success'})
  })
})

module.exports = router
