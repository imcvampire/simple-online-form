import React from 'react'
import PropTypes from 'prop-types'
import {
  Paper,
} from 'material-ui'

import {
  SelectAnswerRadio,
  SelectAnswerCheckbox,
} from '../SelectAnswer'
import {
  MultipleChoiceQuestion,
} from '../../utils/constant'

class Question extends React.Component {
  handleRadioButtonGroupAnswer = (event, value) => this.props.updateSelectedAnswer(value)

  handleCheckboxAnswer = index => (event, value) => {
    const selected = this.selected.slice()

    if (value) {
      selected.push(index)
    } else {
      selected.splice(selected.indexOf(index), 1)
    }

    this.props.updateSelectedAnswer(value)
  }

  render() {
    return (
      <Paper style={{ padding: '20px' }}>
        <h2>{this.props.title}</h2>
        <h3>{this.props.subtitle}</h3>

        {
          this.props.kind === MultipleChoiceQuestion
            ? <SelectAnswerRadio
              answers={this.props.answers}
              handleRadioButtonGroupAnswer={this.handleRadioButtonGroupAnswer}
            />
            : <SelectAnswerCheckbox
              answers={this.props.answers}
              selected={this.props.selected}
              handleCheckboxAnswer={this.handleCheckboxAnswer}
            />
        }
      </Paper>
    )
  }
}

Question.propTypes = {
  kind: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  answers: PropTypes.array.isRequired,
  selected: PropTypes.any,
  updateSelectedAnswer: PropTypes.func.isRequired,
}

export default Question
