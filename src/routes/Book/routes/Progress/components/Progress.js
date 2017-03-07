import React from 'react'
import { reduxForm, Field } from 'redux-form'
import { Col, Button, Form, FormGroup, ControlLabel, Table } from 'react-bootstrap'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

export const Progress = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <Form horizontal onSubmit={handleSubmit((values) => { props.updateProgress(values, props.params.id) })}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Date
          </Col>
          <Col sm={10}>
            <Field name='date' component='input' className='form-control' type='date' required />
            {'  '}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Current page:
          </Col>
          <Col sm={10}>
            <Field
              name='currentPage'
              className='form-control'
              component='input'
              type='number'
              placeholder={props.latestEntry} required />
            {'  '}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <LaddaButton
              loading={props.loading}
              className='btn btn-primary'
              data-size={L}
              data-style={SLIDE_DOWN}
              data-spinner-color='#ddd'
              >
              Add progress
            </LaddaButton>
            {"   "}<span className="text-warning">{props.errorMessage}</span>
          </Col>
        </FormGroup>
      </Form>
      <Table responsive striped>
        <thead>
          <tr>
            <th>Date</th>
            <th>Page Number</th>
          </tr>
        </thead>
        <tbody>
          {
            props.progressEntries.map((entry, index) => {
              return (
                <tr key={index}>
                  <td>{entry.date}</td>
                  <td>{entry.currentPage}</td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
    </div>
  )
}

Progress.propTypes = {
  updateProgress: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  progressEntries: React.PropTypes.array,
  latestEntry: React.PropTypes.number.isRequired
}

export default reduxForm({
  form: 'progress'  // a unique identifier for this form
})(Progress)
