import React from 'react'
import { Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-flexbox-grid'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const ForgotPassword = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Forgot Password</h2>
      { props.emailSent ? (
        <div className='text-center'>
          <h3 className='text-success'>Success! Check your email.</h3>
          <p>I just sent you an email that will help you reset your password.</p>
        </div>
      ) : (
        <div>
          <p>I can reset your password, I'll just need your email.</p>
          <Form onSubmit={handleSubmit((values) => { props.handleForgotPassword(values) })}>
            <FormGroup bsSize='lg' controlId='formHorizontalEmail'>
              <Col>
                <Field
                  name='email'
                  className='form-control'
                  component='input'
                  type='email'
                  placeholder='Email'
                  required />
              </Col>
            </FormGroup>
            <FormGroup bsSize='lg'>
              <LaddaButton
                loading={props.loading}
                className='btn btn-primary'
                data-size={L}
                data-style={SLIDE_DOWN}
                data-spinner-color='#ddd'>
                Reset my password
              </LaddaButton>
              {'   '}<span className='text-warning'>{props.errorMessage}</span>
            </FormGroup>
          </Form>
        </div>
      )}
    </div>
  )
}

ForgotPassword.propTypes = {
  handleForgotPassword: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func,
  emailSent: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  errorMessage: React.PropTypes.string
}

export default reduxForm({
  form: 'forgot-password'  // a unique identifier for this form
})(ForgotPassword)
