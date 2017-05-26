import React from 'react'
import { Col, Row } from 'react-flexbox-grid'
import { Link } from 'react-router'
import './BookThumbnail.scss'
import { truncate } from 'util/common'

const BookThumbnail = (props) => {
  let info = (
    <h5>
      { truncate(props.title, 50, true) }
      <br />
      <small>
        { truncate(props.authors.join(', '), 46, true)}
      </small>
    </h5>
  )

  let thumbnail = (
    <img src={props.thumbnailUrl} className="book-thumb__img book-thumb--shadow"/>
  )

  if (props.linkTo) {
    info = (
      <Link to={props.linkTo}>
        { info }
      </Link>
    )

    thumbnail = (
      <Link to={props.linkTo}>
        { thumbnail }
      </Link>
    )
  }

  return (
    <Col xs={3} sm={2} md={1}>
      <div className='book-thumb__container'>
        { thumbnail }
        { info }
        { props.children }
      </div>
    </Col>
  )
}

BookThumbnail.propTypes = {
  title : React.PropTypes.string.isRequired,
  authors : React.PropTypes.array.isRequired,
  thumbnailUrl : React.PropTypes.string,
  children : React.PropTypes.element,
  linkTo: React.PropTypes.string
}

export default BookThumbnail
