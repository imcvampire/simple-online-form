const express = require('express')
const bodyParser = require('body-parser')

const Question = require('./model/Question.js')

const app = express()

app.use(bodyParser.json())

app.get('/api/questions', (req, res) => {
  Question.getAllQuestion((error, questions) => {
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
