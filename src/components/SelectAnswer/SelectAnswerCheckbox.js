import React from 'react'
import PropTypes from 'prop-types'
import { Checkbox } from 'material-ui'

const SelectAnswerCheckbox = ({
  answers,
  selected,
  handleCheckboxAnswer,
}) => (
  <div>
    <p>Select correct answers:</p>
    {
      answers.map((answer, index) => (
        <Checkbox
          label={answer}
          checked={selected.includes(index)}
          onCheck={handleCheckboxAnswer(index)}
          key={index}
        />
      ))
    }
  </div>
)

SelectAnswerCheckbox.propTypes = {
  answers: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  handleCheckboxAnswer: PropTypes.func,
}

export default SelectAnswerCheckbox