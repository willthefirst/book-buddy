import React from 'react'
import { Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Link } from 'react-router'
import { Col } from 'react-flexbox-grid'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const ResetPassword = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Reset Password</h2>
      {
        (props.isReset) ? (
          <div className='text-center'>
            <h3 className='text-success'>Your password has been reset.</h3>
            <Link to='/auth/login'>
              <Button bsSize='lg' bsStyle='success'>Log in with your new password</Button>
            </Link>
          </div>
        ) : (
          <Form onSubmit={handleSubmit((values) => { props.handleResetPassword(values, props.params.token) })}>
            <FormGroup bsSize='lg' controlId='formHorizontalPassowrd'>
              <Col>
                <Field
                  name='password'
                  className='form-control'
                  component='input'
                  type='password'
                  placeholder='New Password'
                  required />
              </Col>
            </FormGroup>
            <FormGroup bsSize='lg' controlId='formHorizontalConfirmPassword'>
              <Col>
                <Field
                  name='confirmPassword'
                  className='form-control'
                  component='input'
                  type='password'
                  placeholder='Confirm Password'
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
        )
      }
    </div>
  )
}

ResetPassword.propTypes = {
  handleResetPassword: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func,
  isReset: React.PropTypes.bool,
  loading: React.PropTypes.bool,
  errorMessage: React.PropTypes.string,
  params: React.PropTypes.object.isRequired
}

export default reduxForm({
  form: 'reset-password'  // a unique identifier for this form
})(ResetPassword)
