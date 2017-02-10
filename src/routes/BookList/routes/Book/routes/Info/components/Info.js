import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import BookInfo from 'components/BookInfo'

const Info = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  // #todo: understand the handleSubmit thing here
  return (
    <BookInfo
      onSubmit={ handleSubmit( (values)=>{ props.updateBook(values); } ) }
      makeDeleteable
      handleDelete={ handleSubmit( (values)=>{ props.deleteBook(values); } ) }
    />
  )
}

Info.propTypes = {

}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)
