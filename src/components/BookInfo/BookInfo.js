import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'

export const BookInfo = (props) => (
  <Form onSubmit={props.onSubmit} horizontal>
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
        <Button type="submit" bsStyle="primary">
          Save
        </Button>
        {"  "}
        {
          props.makeDeleteable &&
            <Button onClick={props.handleDelete} bsStyle="danger">
              Delete
            </Button>
        }
      </Col>
    </FormGroup>
  </Form>
  )

export default BookInfo
