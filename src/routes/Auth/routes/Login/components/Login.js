import React from 'react'
import { Col, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Login = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit((values) => { props.handleLogin(values) })}>
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
            Login
          </LaddaButton>
        </FormGroup>
      </Form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  loading: React.PropTypes.bool.isRequired
}

export default reduxForm({
  form: 'login'  // a unique identifier for this form
})(Login)
