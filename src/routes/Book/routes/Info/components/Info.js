import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

const Info = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    // #todo don't totally know how this works, esp. if it even access the store to submit values
    <Form onSubmit={ handleSubmit( (values)=>{ props.updateBook(values); } ) } horizontal>
      <FormGroup controlId="formHorizontalTitle">
        <Col componentClass={ControlLabel} sm={2}>
          Title
        </Col>
        <Col sm={10}>
          <Field name="title" component="input" type="text" placeholder="Title" />
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalAuthor">
        <Col componentClass={ControlLabel} sm={2}>
          Author
        </Col>
        <Col sm={10}>
          <Field name="author" component="input" type="text" placeholder="Author" />
        </Col>
      </FormGroup>

      <FormGroup controlId="formHorizontalStatus">
        <Col componentClass={ControlLabel} sm={2}>
          Status
        </Col>
        <Col sm={10}>
          <Field name="status" component="select" placeholder="Status">
            <option value="current">Current</option>
            <option value="queue">Queue</option>
            <option value="finished">Finished</option>
          </Field>
        </Col>
      </FormGroup>
      <FormGroup controlId="formHorizontalTotalPages">
        <Col componentClass={ControlLabel} sm={2}>
          Total Pages
        </Col>
        <Col sm={10}>
          <Field name="totalPages" component="input" type="number" placeholder="0" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">
            Save
          </Button>
        </Col>
      </FormGroup>
    </Form>
  )
}

Info.propTypes = {

}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)
