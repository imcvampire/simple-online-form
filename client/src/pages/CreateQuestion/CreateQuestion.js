import React from 'react'
import {
  Container,
  Row,
  Col,
} from 'react-grid-system'
import {
  SelectField,
  MenuItem,
  TextField,
  RaisedButton,
} from 'material-ui'
import axios from 'axios'

import { CreateAnswerList } from '../../components/AnswerList'
import {
  SelectAnswerRadio,
  SelectAnswerCheckbox,
} from '../../components/SelectAnswer'

import {
  MultipleChoiceQuestion,
  MultipleSelectionQuestion,
} from '../../utils/constant'

class CreateQuestion extends React.Component {
  constructor() {
    super()

    this.state = {
      title: '',
      subtitle: '',
      kind: MultipleChoiceQuestion,
      answers: [''],
      correctAnswers: null,

      hasError: {
        title: false,
        answers: [false],
        correctAnswers: false,
      },

      isSubmitting: false,
    }
  }

  handleChangeText = (type) => (event, value) => {
    this.setState((state) => ({
        ...state,
        [type]: value,
      })
    )
  }

  handleChangeType = (event, index, kind) => {
    this.setState((state) => ({
      ...state,
      kind,
      correctAnswers: kind === MultipleChoiceQuestion ? null : [],
    }))
  }

  handleChangeAnswer = (index) => (event, value) => {
    this.setState((state) => {
      const answers = state.answers.slice()

      answers[index] = value

      return {
        ...state,
        answers,
      }
    })
  }

  addAnswer = () => {
    this.setState((state) => ({
      ...state,
      answers: state.answers.concat(''),
      hasError: {
        ...state.hasError,
        answers: state.hasError.answers.concat(false),
      },
    }))
  }

  handleRadioButtonGroupAnswer = (event, correctAnswers) => {
    this.setState((state) => ({
      ...state,
      correctAnswers,
    }))
  }

  handleCheckboxAnswer = (index) => (event, value) => {
    this.setState((state) => {
      const correctAnswers = state.correctAnswers.slice()

      if (value) {
        correctAnswers.push(index)
      } else {
        correctAnswers.splice(correctAnswers.indexOf(index), 1)
      }

      return {
        ...state,
        correctAnswers,
      }
    })
  }

  submit = (event) => {
    event.preventDefault()

    this.setState((state) => ({
      ...state,
      isSubmitting: true,
    }), () => {
      axios.post('/api/questions', {
        title: this.state.title,
        subtitle: this.state.subtitle,
        answers: this.state.answers,
        correctAnswers: this.state.correctAnswers,
        kind: this.state.kind,
      }).then(() => {
        alert('You have created question!')

        this.setState({
          title: '',
          subtitle: '',
          kind: MultipleChoiceQuestion,
          answers: [''],
          correctAnswers: null,

          hasError: {
            title: false,
            answers: [false],
            correctAnswers: false,
          },

          isSubmitting: false,
        }, () => {
          alert('Error! Please try again!')
        })
      })
    })

  }

  render() {
    return (
      <Container style={{ paddingTop: '50px' }}>
        <Row>
          <Col xs={12} sm={9}>
            <TextField
              name="title"
              hintText="Title"
              fullWidth={true}
              value={this.state.title}
              onChange={this.handleChangeText('title')}
            />
          </Col>

          <Col xs={12} sm={3}>
            <SelectField
              fullWidth={true}
              value={this.state.kind}
              onChange={this.handleChangeType}
            >
              <MenuItem value={MultipleChoiceQuestion} primaryText="Multiple Choice Question" />
              <MenuItem value={MultipleSelectionQuestion} primaryText="Multiple Selection Question" />
            </SelectField>
          </Col>
        </Row>

        <TextField
          name="subtitle"
          hintText="Subtitle"
          fullWidth={true}
          value={this.state.subtitle}
          onChange={this.handleChangeText('subtitle')}
        />

        <CreateAnswerList
          {...this.state}
          handleChangeAnswer={this.handleChangeAnswer}
        />

        <RaisedButton
          label="Add answer"
          primary={true}
          fullWidth={true}
          onClick={this.addAnswer}
        />

        {
          this.state.kind === MultipleChoiceQuestion
            ? <SelectAnswerRadio
              {...this.state}
              handleRadioButtonGroupAnswer={this.handleRadioButtonGroupAnswer}
            />
            : <SelectAnswerCheckbox
              {...this.state}
              selected={this.state.correctAnswers}
              handleCheckboxAnswer={this.handleCheckboxAnswer}
            />
        }

        <RaisedButton
          label="Submit"
          primary={true}
          fullWidth={true}
          onClick={this.submit}
        />
      </Container>
    )
  }
}

export default CreateQuestion
