import React from 'react'
import {
  Container,
} from 'react-grid-system'
import axios from 'axios'

import Question from '../../components/Question'
import {
  MultipleChoiceQuestion
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

    return {
      ...state,
      questionList,
    }
  })

  componentWillMount() {
    axios.get('/api/questions', ({
      data,
    }) => {
      this.setState((state) => ({
        ...state,
        questionList: data.map((question) => ({
          ...question,
          selectedAnswer: question.kind === MultipleChoiceQuestion ? null : []
        }))
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
              updateSelectedAnswer={this.updateSelectedAnswer(index)}
            />
          ))
        }
      </Container>
    )
  }
}

export default AnswerQuestion
