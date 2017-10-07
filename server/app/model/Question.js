const mongoose = require('mongoose')

const {
  MultipleChoiceQuestion,
  MultipleSelectionQuestion,
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
  discriminatorKey: 'kind',
})

const Question = mongoose.model('Question', questionSchema)

const MultipleChoiceQuestion = Question.discriminator( // eslint-disable-line no-unused-vars
  MultipleChoiceQuestion,
  new mongoose.Schema({
    answer: {
      type: Number,
      required: true,
    },
  })
)

const MultipleSelectionQuestion = Question.discriminator( // eslint-disable-line no-unused-vars
  MultipleSelectionQuestion,
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
