import React from 'react'
import { Col } from 'react-flexbox-grid'
import { Link } from 'react-router'
import './BookThumbnail.scss'
import { truncate } from 'util/common'

const BookThumbnail = (props) => {
  const details = (
    <div>
      <img src={props.thumbnailUrl} className='book-thumb__img' />
      <h4>
        { truncate(props.title, 50, true) }
        <br />
        <small>
          { truncate(props.authors.join(', '), 50, true)}
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
  children : React.PropTypes.element,
  linkTo: React.PropTypes.string
}

export default BookThumbnail
