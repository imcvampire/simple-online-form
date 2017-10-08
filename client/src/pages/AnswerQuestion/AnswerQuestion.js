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

  updateSelectedAnswer = index => value => this.setState((state) => {
    const questionList = state.questionList.slice()
    questionList[index].selected = value
    questionList[index].isWrong = false

    return {
      ...state,
      questionList,
    }
  })

  hasWrongAnswer = () => this.state.questionList.some(({ isWrong }) => isWrong)

  submit = () => {
    this.setState((state) => ({
      ...state,
      questionList: state.questionList.map((question) => {
        let isWrong = false

        if (question.kind === MultipleChoiceQuestion) {
          if (question.selected !== question.correctAnswers) isWrong = true
        } else if (question.kind === MultipleSelectionQuestion) {
          if (!isEqual(question.correctAnswers.sort(), question.selected.sort())) isWrong = true
        }

        return {
          ...question,
          isWrong,
        }
      })
    }), () => {
      if (this.hasWrongAnswer()) return

      alert('Your answer is correct!')

      this.setState((state) => ({
        ...state,
        isSubmitting: false,
      }))
    })

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
          disabled={this.state.isSubmitting || this.hasWrongAnswer()}
          onClick={this.submit}
        />
      </Container>
    )
  }
}

export default AnswerQuestion
