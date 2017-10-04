const mongoose = require('mongoose')

const multipleSelectionQuestionSchema = new mongoose.Schema({
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
    type: [Number],
    required: true,
  },
})

const MultipleSelectionQuestion = mongoose.model('MultipleSelectionQuestion', multipleSelectionQuestionSchema)

module.exports = MultipleSelectionQuestion