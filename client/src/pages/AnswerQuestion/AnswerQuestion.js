import React from 'react'
import {
  Container,
} from 'react-grid-system'

import Question from '../../components/Question'


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