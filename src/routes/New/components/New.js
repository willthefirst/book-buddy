import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import BookThumbnail from 'components/BookThumbnail'
import GBooksSearchForm from 'components/GBooksSearchForm'
import { Col, Row, Thumbnail, Form, FormGroup, Button, ControlLabel } from 'react-bootstrap';

const New = (props) => {
  const { handleSubmit, change, pristine, reset, submitting, createBook, queryGBooks } = props
  // #todo: understand the handleSubmit thing here
  return (
    <div>
      <Form horizontal>
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <Field className="form-control" name="title" component="input" type="text" onChange={ (e) => { queryGBooks(e.target.value) } } placeholder="Title" />
          </Col>
        </FormGroup>
      </Form>
      <Row>
      {
        props.gBooksResults.map((book, key) => {
          return (
            <BookThumbnail
              title={book.title}
              authors={book.authors}
              thumbnailUrl={book.thumbnailUrl}
              key={key} >
              <Button bsStyle="success" onClick={() => createBook(book)}>Add To Library</Button>
            </BookThumbnail>
          )
        })
      }
      </Row>
    </div>

  )
}

New.propTypes = {
  queryGBooks: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'gBooksForm'
})(New)
