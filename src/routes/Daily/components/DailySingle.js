import React, { Component } from 'react'
import BookThumbnail from 'components/BookThumbnail'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

let DailySingleForm = (props) => {

  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <InputGroup>
          <span className="input-group-addon" id="basic-addon1">p.</span>
          <Field
            name='currentPage'
            className='form-control'
            component='input'
            type='number'
            aria-describedby="basic-addon1"
            placeholder="0"
            required
            />
        </InputGroup>
      </FormGroup>
      <Button type="submit" bsStyle="primary">Submit</Button>
    </Form>
  )
}

DailySingleForm = reduxForm()(DailySingleForm)

let DailySingle = (props) => {
  return (
    <BookThumbnail
      title={props.title}
      authors={props.authors}
      thumbnailUrl={props.thumbnailUrl}
      linkTo={`/book/id/${props.bookId}/progress`}>
      <DailySingleForm
        initialValues={
          {
            date: props.date,
            bookId: props.bookId,
            currentPage: props.currentPage
          }
        }
        form={props.bookId}
        enableReinitialize={true}
        onSubmit={props.handleSubmit}
      />
    </BookThumbnail>
  )
}

DailySingle.propTypes = {
  title: React.PropTypes.string.isRequired,
  authors: React.PropTypes.array.isRequired,
  thumbnailUrl: React.PropTypes.string.isRequired,
  bookId: React.PropTypes.string.isRequired,
  currentPage: React.PropTypes.number,
  handleSubmit: React.PropTypes.func.isRequired,
  date: React.PropTypes.string.isRequired
}

export default DailySingle
