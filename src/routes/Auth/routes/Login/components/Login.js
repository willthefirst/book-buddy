import React from 'react'
import { Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-flexbox-grid'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Login = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit((values) => { props.handleLogin(values) })}>
        <FormGroup controlId='formHorizontalEmail'>
          <ControlLabel>
            Email
          </ControlLabel>
          <Col>
            <Field name='email' className='form-control' component='input' type='text' placeholder='Email' />
          </Col>
        </FormGroup>
        <FormGroup controlId='formHorizontalPassword'>
          <ControlLabel>
            Password
          </ControlLabel>
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
            Login
          </LaddaButton>
          {'   '}<span className='text-warning'>{props.errorMessage}</span>
        </FormGroup>
      </Form>
      <Link to='/auth/forgot-password'>Forgot your password?</Link>
    </div>
  )
}

Login.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired,
  errorMessage: React.PropTypes.string
}

export default reduxForm({
  form: 'login'  // a unique identifier for this form
})(Login)
