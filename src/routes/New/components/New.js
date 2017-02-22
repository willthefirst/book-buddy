import React, { Component } from 'react'
import { reduxForm } from 'redux-form'
import BookInfo from 'components/BookInfo'
import BookGrid from 'components/BookGrid'
import GBooksSearchForm from 'components/GBooksSearchForm'
import { Col, Row, Thumbnail, Button } from 'react-bootstrap';
import { Link } from 'react-router'

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
      <Row >
      {
        props.gBooksResults.map((book, key) => {
          return (
              <Col xs={6} key={key}>
                <Thumbnail>
                  <Row>
                    <Col xs={4}>
                      <img src={book.thumbnailUrl} className="img-responsive" height={500} style={{ marginBottom: '24px' }} />
                    </Col>
                    <Col xs={8}>
                      <h3>{book.title}</h3>
                      <h4>{book.authors.join(', ')}</h4>
                      <Button bsStyle="success">+ Add To Library</Button>
                    </Col>
                  </Row>
                </Thumbnail>
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
