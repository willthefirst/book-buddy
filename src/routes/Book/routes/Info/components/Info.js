import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Info = (props) => {
  const { handleSubmit } = props
  // #todo: understand the handleSubmit thing here
  return (
    <Form onSubmit={handleSubmit((values) => { props.updateBook(values) })} horizontal>
      <FormGroup controlId='formHorizontalStatus'>
        <Col componentClass={ControlLabel} sm={2}>
          Status
        </Col>
        <Col sm={10}>
          <Field className='form-control' name='status' component='select' placeholder='Status'>
            <option value='Queue'>Queue</option>
            <option value='Current'>Current</option>
            <option value='Finished'>Finished</option>
          </Field>
        </Col>
      </FormGroup>
      <FormGroup controlId='formHorizontalTotalPages'>
        <Col componentClass={ControlLabel} sm={2}>
          Total Pages
        </Col>
        <Col sm={10}>
          <Field className='form-control' name='totalPages' component='input' type='number' placeholder='0' />
        </Col>
      </FormGroup>
      <FormGroup>
        <Col smOffset={2} sm={10}>
          <LaddaButton
            loading={props.loading}
            className='btn btn-primary'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
            >
            Save
          </LaddaButton>
          {'  '}
          <LaddaButton
            onClick={handleSubmit((values) => { props.deleteBook(values) })}
            className='btn btn-danger'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
            >
            Delete
          </LaddaButton>
          {"   "}<span className="text-warning">{props.errorMessage}</span>
        </Col>
      </FormGroup>
    </Form>
  )
}

Info.propTypes = {
  updateBook : React.PropTypes.func.isRequired,
  handleSubmit : React.PropTypes.func.isRequired,
  deleteBook : React.PropTypes.func
}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)
