import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

export const Login = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <Form onSubmit={ handleSubmit( (values) => { props.handleLogin(values) }) }>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel}>
            Email
          </Col>
          <Col>
            <Field name="email" component="input" type="text" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel}>
            Password
          </Col>
          <Col>
            <Field name="password" component="input" type="text" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary">Save</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

Login.propTypes = {

}

export default reduxForm({
  form: 'login'  // a unique identifier for this form
})(Login)
