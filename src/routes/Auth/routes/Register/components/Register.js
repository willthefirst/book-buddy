import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

const Register = (props) => {
  const { handleSubmit } = props

  return (
    <div>
      <h2>Register</h2>
      <Form onSubmit={ handleSubmit( (values) => { props.handleRegister(values) }) }>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel}>
            Email
          </Col>
          <Col>
            <Field name="email" className="form-control" component="input" type="text" placeholder="Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel}>
            Password
          </Col>
          <Col>
            <Field name="password" className="form-control" component="input" type="password" placeholder="Password" />
          </Col>
        </FormGroup>
        <FormGroup>
          <Button type="submit" bsStyle="primary">Register</Button>
        </FormGroup>
      </Form>
    </div>
  )
}

Register.propTypes = {
  handleRegister: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'register'  // a unique identifier for this form
})(Register)
