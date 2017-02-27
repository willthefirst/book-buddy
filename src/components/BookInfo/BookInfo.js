import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'
import { Field } from 'redux-form'
import React, { Component } from 'react'

class  BookInfo extends Component {
  render() {
    return (
      <Form onSubmit={this.props.onSubmit} horizontal>
        <FormGroup controlId="formHorizontalStatus">
          <Col componentClass={ControlLabel} sm={2}>
            Status
          </Col>
          <Col sm={10}>
            <Field name="status" component="select" placeholder="Status">
              <option value="Queue">Queue</option>
              <option value="Current">Current</option>
              <option value="Finished">Finished</option>
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
              this.props.makeDeleteable &&
                <Button onClick={this.props.handleDelete} bsStyle="danger">
                  Delete
                </Button>
            }
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

// #todo: for now, we're not going to let users edit titles and authors, since we're
// pulling from gBooks. if it becomes important to make these custom, we'll implement.

// <FormGroup controlId="formHorizontalTitle">
//   <Col componentClass={ControlLabel} sm={2}>
//     Title
//   </Col>
//   <Col sm={10}>
//     <Field name="title" component="input" type="text" placeholder="Title" />
//   </Col>
// </FormGroup>
// <FormGroup controlId="formHorizontalAuthor">
//   <Col componentClass={ControlLabel} sm={2}>
//     Authors
//   </Col>
//   <Col sm={10}>
//     <Field name="authors" component="input" type="text" placeholder="Authors" />
//   </Col>
// </FormGroup>

export default BookInfo
