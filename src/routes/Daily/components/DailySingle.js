import React, { Component } from 'react'
import BookThumbnail from 'components/BookThumbnail'
import { Button, Form, FormGroup, InputGroup } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

let DailySingleForm = (props) => {
  let deleteButton
  if (props.handleDelete) {
    deleteButton = (
      <LaddaButton
        onClick={props.handleSubmit((values) => { props.handleDelete(values) })}
        className='btn btn-danger'
        data-size={L}
        data-style={SLIDE_DOWN}
        data-spinner-color='#ddd'
        >
        Delete
      </LaddaButton>
    )
  }

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
      <LaddaButton
        className='btn btn-primary'
        data-size={L}
        data-style={SLIDE_DOWN}
        data-spinner-color='#ddd'
        >
        Save
      </LaddaButton>
      {'  '}
      { deleteButton }
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
        enableReinitialize={true}
        form={props.formId || props.bookId}
        onSubmit={props.handleSubmit}
        handleDelete={props.handleDelete}
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
