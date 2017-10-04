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

const multipleSelectionQuestion = mongoose.model('multipleSelectionQuestion', multipleSelectionQuestion)

module.exports = multipleSelectionQuestion