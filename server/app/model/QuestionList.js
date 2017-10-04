const mongoose = require('mongoose')

const MultipleChoiceQuestion = require('./MultipleChoiceQuestion')
const MultipleSelectionQuestion = require('./MultipleSelectionQuestion')

const {
  MULTIPLE_CHOICE_QUESTION,
  MULTIPLE_SELECTION_QUESTION,
} = require('../utils/constants')

const questionListSchema = new mongoose.Schema({
  questions: [Object]
})

const questionList = mongoose.model('questionList', questionListSchema)

function getAllQuestions(cb) {
  questionList.find({}, (error, results) => {
    if (error) throw new Error(error)

    cb(results)
  })
}

function addQuestion(type, {
  title,
  subtitle = '',
  options,
  answer,
}, cb) {
  if (type === MULTIPLE_CHOICE_QUESTION) {
      MultipleChoiceQuestion.create({
        title,
        subtitle,
        options,
        answer,
      }, cb)
  } else if (type === MULTIPLE_SELECTION_QUESTION) {
    MultipleSelectionQuestion.create({
      title,
      subtitle,
      options,
      answer,
    }, cb)
  } else {
    cb(new Error('Wrong type'))
  }
}

module.exports = {
  getAllQuestions,
  addQuestion,
}