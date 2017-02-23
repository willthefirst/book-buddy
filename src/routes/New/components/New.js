import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import BookInfo from 'components/BookInfo'
import BookThumbnail from 'components/BookThumbnail'
import GBooksSearchForm from 'components/GBooksSearchForm'
import { Col, Row, Thumbnail, Button } from 'react-bootstrap';

const New = (props) => {
  const { handleSubmit, change, pristine, reset, submitting, createBook, queryGBooks } = props
  // #todo: understand the handleSubmit thing here
  return (
    // <BookInfo
    //   onSubmit={ handleSubmit( (values)=>{ createBook(values); } ) }
    // />
    <div>
      <GBooksSearchForm
        onChange={ (e) => { queryGBooks(e.target.value) } }
        />
      <Row>2
      {
        props.gBooksResults.map((book, key) => {
          return (
            <Col xs={6} sm={3} md={2}>
              <BookThumbnail
                title={book.title}
                authors={book.authors}
                thumbnailUrl={book.thumbnailUrl}
                key={key}>
                <Button bsStyle="success">Add To Library</Button>
              </BookThumbnail>
            </Col>
          )
        })
      }
      </Row>

    </div>

  )
}

New.propTypes = {
  // onChange={ handleSubmit( (values) => { queryGBooks(values) } ) }

}

export default reduxForm({
  form: 'gBooksForm'  // a unique identifier for this form
})(New)
