import React from 'react'
import PropTypes from 'prop-types'
import {
  RadioButtonGroup,
  RadioButton,
} from 'material-ui'

const SelectAnswerRadio = ({
  answers,
  handleRadioButtonGroupAnswer,
}) => (
  <div>
    <p>Correct answer:</p>
    <RadioButtonGroup
      name="radio-button-correct-answer"
      onChange={handleRadioButtonGroupAnswer}
    >
      {
        answers.map((answer, index) => (
          <RadioButton
            value={index}
            label={answer}
            key={index}
          />
        ))
      }
    </RadioButtonGroup>
  </div>
)

SelectAnswerRadio.propTypes = {
  answers: PropTypes.array.isRequired,
  handleRadioButtonGroupAnswer: PropTypes.func,
}

export default SelectAnswerRadio
