import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import Truncate from 'react-truncate'
import { Link } from 'react-router'
import './BookThumbnail.scss'

const BookThumbnail = (props) => {
  let authors = [];

  for (let i = 0; (i < props.authors.length && i <= 2); i++) {
    authors.push(props.authors[i])
  }

  authors = authors.join(', ')
  console.log(authors);

  const details = (
    <div>
      <img src={props.thumbnailUrl} className='book-thumb__img' />
      <h4>
        <Truncate lines={2}>
          {props.title}
        </Truncate>
        <br />
        <small>
          {authors}
        </small>
      </h4>
    </div>
  )

  if (props.linkTo) {
    return (
      <Col xs={4} sm={3} md={2} className='book-thumb__container'>
        <Link to={props.linkTo}>
          { details }
        </Link>
        { props.children }
      </Col>
    )
  } else {
    return (
      <Col xs={4} sm={3} md={2} className='book-thumb__container'>
        { details }
        { props.children }
      </Col>
    )
  }
}

BookThumbnail.propTypes = {
  title : React.PropTypes.string.isRequired,
  authors : React.PropTypes.array.isRequired,
  thumbnailUrl : React.PropTypes.string,
  linkTo: React.PropTypes.string
}

export default BookThumbnail
