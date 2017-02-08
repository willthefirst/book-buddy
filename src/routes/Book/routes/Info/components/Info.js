import React, { Component } from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
const  { DOM: { input, select, textarea } } = React


/* #todo Turn form controlled into controlled inputs that auto-update with server, not placeholder stuff.*/

const Info = (props) => {
  const { handleSubmit, pristine, reset, submitting, load } = props
  return (
    <Form horizontal>
      <div>
        <button type="button" onClick={() => load({title:'asdasd'})}>Load Account</button>
      </div>
      <FormGroup controlId="formHorizontalTitle">
        <Col componentClass={ControlLabel} sm={2}>
          Title
        </Col>
        <Col sm={10}>
          <Field name="title" component="input" type="text" placeholder="Title" />
        </Col>
      </FormGroup>
    </Form>
  )
}

Info.propTypes = {

}

// <FormGroup controlId="formHorizontalAuthor">
//  <Col componentClass={ControlLabel} sm={2}>
//  Author
//  </Col>
//  <Col sm={10}>
//  <FormControl type="text" placeholder={ props.author || "Author"} />
//  </Col>
//  </FormGroup>
//
//  <FormGroup controlId="formHorizontalStatus">
//  <Col componentClass={ControlLabel} sm={2}>
//  Status
//  </Col>
//  <Col sm={10}>
//  <FormControl componentClass="select" placeholder={ props.status || "Status"}>
//  <option value="current">Current</option>
//  <option value="queue">Queue</option>
//  <option value="finished">Finished</option>
//  </FormControl>
//  </Col>
//  </FormGroup>
//
//  <FormGroup controlId="formHorizontalTotalPages">
//  <Col componentClass={ControlLabel} sm={2}>
//  Total Pages
//  </Col>
//  <Col sm={10}>
//  <FormControl type="number" placeholder={ props.totalPages || "0"} />
//  </Col>
//  </FormGroup>
//
//  <FormGroup>
//  <Col smOffset={2} sm={10}>
//  <Button type="submit" onSubmit={ props.updateBook(props.id) }>
//  Save
//  </Button>
//  </Col>
//  </FormGroup>

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)

// You have to connect() to any reducers that you wish to connect to yourself
// Info = connect(
//   state => ({
//     initialValues: state.book.activeBook // pull initial values from account reducer
//   }),
//   { load: loadAccount }               // bind account loading action creator
// )(Info)
