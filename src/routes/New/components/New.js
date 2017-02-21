import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import BookInfo from 'components/BookInfo'
import GBooksSearchForm from 'components/GBooksSearchForm'

const New = (props) => {
  const { handleSubmit, change, pristine, reset, submitting, createBook, queryGBooks } = props
  // #todo: understand the handleSubmit thing here
  return (
    // <BookInfo
    //   onSubmit={ handleSubmit( (values)=>{ createBook(values); } ) }
    // />
    <div>
      <GBooksSearchForm
        onSubmit={ handleSubmit( (values) => { createBook(values) } ) }
        onChange={ (e) => { queryGBooks(e.target.value) } }
        />
      {
        props.gBooksResults.map((book) => {
          return (
            <li>
              <div>Title: {book.title}</div>
              <div>Author: {book.authors.join(', ')}</div>
              <div>Total pages: {book.totalPages}</div>
              <img src={book.thumbnailUrl} alt={book.title} />
            </li>
          )
        })
      }
    </div>

  )
}

New.propTypes = {
  // onChange={ handleSubmit( (values) => { queryGBooks(values) } ) }

}

export default reduxForm({
  form: 'gBooksForm'  // a unique identifier for this form
})(New)
