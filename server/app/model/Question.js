const mongoose = require('mongoose')

const {
  MULTIPLE_CHOICE_QUESTION,
  MULTIPLE_SELECTION_QUESTION,
} = require('../utils/constants')

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  options: {
    type: [String],
    required: true,
  },
}, {
  discriminatorKey: 'kind'
})

const Question = mongoose.model('Question', questionSchema)

const MultipleChoiceQuestion = Question.discriminator( // eslint-disable-line no-unused-vars
  MULTIPLE_CHOICE_QUESTION,
  new mongoose.Schema({
    answer: {
      type: Number,
      required: true,
    },
  })
)

const MultipleSelectionQuestion = Question.discriminator( // eslint-disable-line no-unused-vars
  MULTIPLE_SELECTION_QUESTION,
  new mongoose.Schema({
    answer: {
      type: [Number],
      required: true,
    },
  })
)

function getAllQuestions(cb) {
  Question.find({}, cb)
}

function addQuestion({
  kind,
  title,
  subtitle = '',
  options,
  answer,
}, cb) {
  Question.create({
    kind,
    title,
    subtitle,
    options,
    answer,
  }, cb)
}


module.exports = {
  getAllQuestions,
  addQuestion,
}