const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Question = require('./model/Question.js')

const app = express()

const mongooseOption = {
  useMongoClient: true,
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
}

mongoose.connect(
  'mongodb://imcvampire:123456@ds111535.mlab.com:11535/simple-online-form',
  mongooseOption
)

app.use(bodyParser.json())

app.get('/api/questions', (req, res) => {
  Question.getAllQuestions((error, questions) => {
    if (error) res.status(500).end()

    res.json(questions)
  })
})

app.post('/api/questions', (req, res) => {
  Question.addQuestion(req.body, (error) => {
    if (error) res.status(500).end()

    res.status(204).end()
  })
})

module.exports = app
