import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Register = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit((values) => { props.handleRegister(values) })}>
        <FormGroup controlId='formHorizontalEmail'>
          <Col componentClass={ControlLabel}>
            Email
          </Col>
          <Col>
            <Field name='email' className='form-control' component='input' type='text' placeholder='Email' />
          </Col>
        </FormGroup>
        <FormGroup controlId='formHorizontalPassword'>
          <Col componentClass={ControlLabel}>
            Password
          </Col>
          <Col>
            <Field name='password' className='form-control' component='input' type='password' placeholder='Password' />
          </Col>
        </FormGroup>
        <FormGroup>
          <LaddaButton
            loading={props.loading}
            className='btn btn-primary'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
          >
            Register
          </LaddaButton>
          {"   "}<span className="text-warning">{props.errorMessage}</span>
        </FormGroup>
      </Form>
    </div>
  )
}

Register.propTypes = {
  handleRegister: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'register'  // a unique identifier for this form
})(Register)
