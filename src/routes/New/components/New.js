import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import BookInfo from 'components/BookInfo'

const New = (props) => {
  const { handleSubmit, pristine, reset, submitting } = props
  // #todo: understand the handleSubmit thing here
  return (
    <BookInfo
      onSubmit={ handleSubmit( (values)=>{ props.createBook(values); } ) }
    />
  )
}

New.propTypes = {

}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(New)
