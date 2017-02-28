import React from 'react'
import { reduxForm } from 'redux-form'
import { Row, Col, Button, Form, FormGroup, ControlLabel, Table } from 'react-bootstrap'
import { Field } from 'redux-form'

export const Progress = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <Form horizontal onSubmit={ handleSubmit( (values)=>{  props.updateProgress(values, props.params.id); } ) }>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Date
          </Col>
          <Col sm={10}>
            <Field name="date" component="input" type="date" required />
            {'  '}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Current page:
          </Col>
          <Col sm={10}>
            <Field name="currentPage" component="input" type="number" placeholder="Current Page" required />
            {'  '}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col sm={12}>
            <Button bsStyle="primary" type="submit">Add Progress</Button>
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

}

export default reduxForm({
  form: 'progress'  // a unique identifier for this form
})(Progress)
