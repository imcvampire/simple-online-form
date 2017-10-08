import React from 'react'
import {
  Container,
} from 'react-grid-system'
import { RaisedButton } from 'material-ui'
import axios from 'axios'
import isEqual from 'lodash.isequal'

import Question from '../../components/Question'
import {
  MultipleChoiceQuestion,
  MultipleSelectionQuestion,
} from '../../utils/constant'


class AnswerQuestion extends React.Component {
  constructor() {
    super()

    this.state = {
      questionList: [],
      isSubmitting: false,
    }
  }

  updateSelectedAnswer = index => value => this.setState((state) => {
    const questionList = state.questionList.slice()
    questionList[index].selected = value
    questionList[index].isWrong = false

    return {
      ...state,
      questionList,
    }
  })

  componentDidMount() {
    axios.get('/api/questions').then(({ data }) => {
      this.setState((state) => ({
        ...state,
        questionList: data.map((question) => ({
          ...question,
          selected: question.kind === MultipleChoiceQuestion ? null : [],
          isWrong: false,
        }))
      }))
    })
  }

  submit = () => {
    this.state.questionList.forEach((question) => {
      if (question.kind === MultipleChoiceQuestion) {
        if (question.selected !== question.correctAnswers) question.isWrong = true
      } else if (question.kind === MultipleSelectionQuestion) {
        if (!isEqual(question.correctAnswers.sort(), question.selected.sort())) question.isWrong = true
      }
    })

    if (this.state.questionList.some(({ isWrong }) => isWrong)) return

    alert('Your answer is correct!')
  }

  render() {
    return (
      <Container>
        {
          this.state.questionList.map((value, index) => (
            <Question
              {...value}
              key={value._id}
              updateSelectedAnswer={this.updateSelectedAnswer(index)}
            />
          ))
        }

        <RaisedButton
          label="Submit"
          fullWidth={true}
          primary={true}
          disabled={this.state.isSubmitting}
          onClick={this.submit}
        />
      </Container>
    )
  }
}

export default AnswerQuestion
