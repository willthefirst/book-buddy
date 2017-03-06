import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

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
          <Button type='submit' bsStyle='primary'>Submit</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

Login.propTypes = {
  handleLogin: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'login'  // a unique identifier for this form
})(Login)
