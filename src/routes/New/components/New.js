import React from 'react'
import { Field, reduxForm } from 'redux-form'
import BookThumbnail from 'components/BookThumbnail'
import { Form, FormGroup, Button } from 'react-bootstrap'
import { Row, Col } from 'react-flexbox-grid'

const New = (props) => {
  const { createBook, queryGBooks } = props
  // #todo: understand the handleSubmit thing here
  return (
    <div className="full-width">
      <Row>
        <Col xs={12}>
          <Form>
            <FormGroup bsSize='lg'>
              <Field
                className='form-control'
                name='title'
                component='input'
                type='text'
                onChange={(e) => { queryGBooks(e.target.value) }}
                placeholder='Start typing the name of the book...' />
            </FormGroup>
          </Form>
          <span className="text-warning">{props.errorMessage}</span>
        </Col>
      </Row>
      <Row>
        {
        props.gBooksResults.map((book, key) => {
          return (
            <BookThumbnail
              title={book.title}
              authors={book.authors}
              thumbnailUrl={book.thumbnailUrl}
              key={key} >
              <Button bsStyle='success' onClick={() => createBook(book)}>Add To Library</Button>
            </BookThumbnail>
          )
        })
      }
      </Row>
    </div>
  )
}

New.propTypes = {
  queryGBooks: React.PropTypes.func.isRequired,
  gBooksResults: React.PropTypes.array.isRequired,
  createBook: React.PropTypes.func.isRequired
}

export default reduxForm({
  form: 'gBooksForm'
})(New)
