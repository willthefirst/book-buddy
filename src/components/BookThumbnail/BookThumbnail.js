import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import './BookThumbnail.scss'

const BookThumbnail = (props) => {

  const details = (
    <div>
      <img src={props.thumbnailUrl} className='book-thumb__img' />
      <h4>{props.title}</h4>
      <h5>{props.authors.join(', ')}</h5>
    </div>
  )

  if (props.linkTo) {
    return (
      <div>
        <Link to={props.linkTo}>
          { details }
        </Link>
        { props.children }
      </div>
    )
  } else {
    return (
      <div>
        { details }
        { props.children }
      </div>
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
