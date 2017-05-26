import React from 'react'
import { Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-flexbox-grid'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'
import { Link } from 'react-router'

const Register = (props) => {
  const { handleSubmit } = props

  const registerForm = (
    <Form onSubmit={handleSubmit((values) => { props.handleRegister(values) })}>
      <FormGroup bsSize='lg' controlId='formHorizontalEmail'>
        <Col>
          <Field name='email' className='form-control' component='input' type='text' placeholder='Email' />
        </Col>
      </FormGroup>
      <FormGroup bsSize='lg' controlId='formHorizontalPassword'>
        <Col>
          <Field name='password' className='form-control' component='input' type='password' placeholder='Password' />
        </Col>
      </FormGroup>
      <FormGroup bsSize='lg'>
        <LaddaButton
          loading={props.loading}
          className='btn btn-primary'
          data-size={L}
          data-style={SLIDE_DOWN}
          data-spinner-color='#ddd'>
          Register
        </LaddaButton>
        {'   '}<span className='text-warning'>{props.errorMessage}</span>
      </FormGroup>
      <FormGroup bsSize='lg'>
        Already a user? <Link to="/auth/login">Log in here.</Link>
      </FormGroup>
    </Form>
  )

  const successMessage = (
    <div className='text-center'>
      <h3 className='text-success'>
        Success!
      </h3>
      <p>Now, check your email for a confirmation message.</p>
    </div>
  )

  return (
    <div>
      <h2>Register</h2>
      {
        props.isRegistered ? (successMessage) : (registerForm)
      }
    </div>
  )
}

Register.propTypes = {
  handleRegister: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func,
  isRegistered: React.PropTypes.bool.isRequired,
  loading: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
}

export default reduxForm({
  form: 'register'  // a unique identifier for this form
})(Register)
