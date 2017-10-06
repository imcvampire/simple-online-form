import React from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'material-ui'

const AnswerList = ({
  answers,
  handleChangeAnswer,
}) => (
  <div style={{ paddingTop: '50px' }}>
    {
      answers.map((answer, index) => (
        <TextField
          name={`answer${index}`}
          value={answer}
          fullWidth={true}
          style={{ height: '40px' }}
          onChange={handleChangeAnswer(index)}
          key={index}
        />
      ))
    }
  </div>
)

AnswerList.propTypes = {
  answers: PropTypes.array.isRequired,
  handleChangeAnswer: PropTypes.func.isRequired,
}

export default AnswerList
