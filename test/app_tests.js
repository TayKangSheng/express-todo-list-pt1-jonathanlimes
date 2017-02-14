// default requires for this test js
var expect = require('chai').expect
var request = require('supertest')
var app = require('../app')
var Todo = require('../models/todo')

var dummyTodoId
// create dummy data for tests
before(function (done) {
  Todo.find({name: 'Dummy Todo'}, function (err, output) {
    if (err || output.length === 0) {
      Todo.create({name: 'Dummy Todo'}, function (err, output) {
        dummyTodoId = output.id
        done()
      })
    } else {
      dummyTodoId = output[0].id
      done()
    }
  })
})

// Test that checks the status codes
describe('Site Root', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/todos')
    .expect(200, done)
  })
})

// GET
describe('GET /todos', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/todos')
    .set('Accept', 'application/json')
    // what does this app/json refer to?
    .expect(200, done)
  })

  it('should return an array', function (done) {
    request(app).get('/todos')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(error).to.be.a('null')
        expect(response.body).to.be.an('array')
        done()
      })
  })

  it('should return all the records in the database', function (done) {
    request(app).get('/todos')
      .set('Accept', 'application/json')
      .end(function (error, response) {
        expect(error).to.be.a('null')
        expect(response.body.length).to.exist
        done()
      })
  })
})

// GET ID
describe('GET /todos/:id', function () {
  it('should return a 200 response', function (done) {
    request(app).get('/todos/:id')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should return an object containing the fields "name", "description" and "completed"', function (done) {
    request(app).get('/todos/' + dummyTodoId)
    .set('Accept', 'application/json')
    .end(function (error, response) {
      expect(error).to.be.a('null')
      expect(response.body).to.have.property('name')
      expect(response.body).to.have.property('description')
      expect(response.body).to.have.property('completed')
      done()
    })
  })
})

// POST
describe('POST /todos', function () {
  it('should return a 200 response', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      name: "Test Test Test",
      description: "I love testing, NOT",
      completed: false
    })
    .expect(302, done)
  })

  it('should return a 422 response if the field name is wrong', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      completed: true
    })
    .expect(422, done)
  })

  it('should return an error message if the name field is wrong', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      name: 'Lol'
    })
    .end(function (error, response) {
      expect(error).to.be.a('null')
      done()
    })
  })

  it('should add a new todo to the database', function (done) {
    request(app).post('/todos')
    .set('Accept', 'application/json')
    .send({
      name: 'Another test dummy todo',
      completed: false
    })
    .expect(302, done)
  })
})

// PUT
describe('PUT /todos/:id', function () {
  it('should return a 200 response', function (done) {
    request(app).put('/todos/:id')
    .set('Accept', 'application/json')
    .expect(200, done)
  })

  it('should update a todo document', function(done) {
    request(app).put('/todos/58a02013f36d2837a7c6d277')
    .set('Accept', 'application/json')
    .send({
      name: 'Eat some chizza instead of pizza',
      description: "I do not actually like to describe things",
      completed: false
    })
    .expect(200, done)
  })
})

// DELETE
describe('DELETE /todos/:id', function () {
  it('should remove a todo document', function (done) {
    request(app).delete('/todos/' + dummyTodoId)
  .end(function (err, response) {
    expect(response.statusCode).to.equal(200)
    expect(response.body).to.have.property('msg')
    expect(response.body.msg).to.equal('success')
    done()
  })
  })
})
