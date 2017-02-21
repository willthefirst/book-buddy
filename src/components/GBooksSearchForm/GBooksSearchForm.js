import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'
import { Field } from 'redux-form'
import React, { Component } from 'react'

class GBooksSearchForm extends Component {
  render() {
    return (
      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <Field name="title" component="input" type="text" onChange={this.props.onChange} placeholder="Title" />
          </Col>
        </FormGroup>
      </Form>
    )
  }
}

export default GBooksSearchForm
