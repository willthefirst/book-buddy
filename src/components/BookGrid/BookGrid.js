import React from 'react'
import { Col, Row, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router'

const BookSingle = (props) => {
  return (
    <Col xs={4} sm={3} height="100">
      <Link to={`/book/id/${props._id}/progress`}>
        <Thumbnail src={props.thumbnailUrl} alt="242x200">
          <h3>{props.title}</h3>
          <h4>{props.authors.join(', ')}</h4>
        </Thumbnail>
      </Link>
    </Col>
  )
}
// <img src={props.thumbnailUrl} className="img-responsive" style={{ marginBottom: '24px' }} />
// <h4>{props.title}</h4>
// <h5>{props.authors.join(', ')}</h5>
BookSingle.propTypes = {
  title : React.PropTypes.string.isRequired,
  authors : React.PropTypes.array.isRequired,
  thumbnailUrl : React.PropTypes.string
}

const BookGrid = (props) => {
  return (
    <Row>
      {
        props.books.map((book, key) => {
          return (
            <BookSingle
              title={ book.title }
              authors={ book.authors }
              thumbnailUrl={ book.thumbnailUrl }
              key={ key }
              handleSelect={ ()=> {console.log('handleSelectExists');}}
              _id={ book._id }
              />
          )
        })
      }
    </Row>
  )
}

BookGrid.propTypes = {
  books : React.PropTypes.array.isRequired
}

export default BookGrid
