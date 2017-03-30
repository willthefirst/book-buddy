import React from 'react'
import { Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col } from 'react-flexbox-grid'
import { Field, reduxForm } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const ResetPassword = (props) => {
  const { handleSubmit } = props

  // #todo bulletproof this
  return (
    <div>
      <h2>Reset Password</h2>
      <Form onSubmit={handleSubmit((values) => { props.handleResetPassword(values, props.params.token) })}>
        <FormGroup controlId='formHorizontalPassowrd'>
          <ControlLabel>
            New Password
          </ControlLabel>
          <Col>
            <Field name='password' className='form-control' component='input' type='text' placeholder='New Password' required />
          </Col>
        </FormGroup>
        <FormGroup controlId='formHorizontalConfirmPassword'>
          <ControlLabel>
            Retype New Password
          </ControlLabel>
          <Col>
            <Field name='confirm-password' className='form-control' component='input' type='password' placeholder='Confirm Password' required />
          </Col>
        </FormGroup>
        <FormGroup>
          <LaddaButton
            loading={props.loading}
            className='btn btn-primary'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'>
            Reset my password
          </LaddaButton>
          {"   "}<span className="text-warning">{props.errorMessage}</span>
        </FormGroup>
      </Form>
    </div>
  )
}

ResetPassword.propTypes = {
  handleResetPassword: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func
}

export default reduxForm({
  form: 'reset-password'  // a unique identifier for this form
})(ResetPassword)
