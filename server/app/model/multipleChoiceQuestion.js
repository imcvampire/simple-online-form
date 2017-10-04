const mongoose = require('mongoose')

const multipleChoiceQuestionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  subtitle: String,
  options: {
    type: [String],
    required: true,
  },
  answer: {
    type: Number,
    required: true,
  },
})


const multipleChoiceQuestion = mongoose.model('multipleChoiceQuestion', multipleChoiceQuestionSchema)

module.exports = multipleChoiceQuestion