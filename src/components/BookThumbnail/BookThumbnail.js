import React from 'react'
import { Col, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router'
import './BookThumbnail.scss'

// Source: http://stackoverflow.com/questions/1199352/smart-way-to-shorten-long-strings-with-javascript
String.prototype.trunc =
     function (n, useWordBoundary) {
       if (this.length <= n) { return this }
       var subString = this.substr(0, n - 1)
       return (useWordBoundary
            ? subString.substr(0, subString.lastIndexOf(' '))
            : subString) + '...'
     }

const BookThumbnail = (props) => {
  const details = (
    <div>
      <img src={props.thumbnailUrl} className='book-thumb__img' />
      <h4>
        { props.title.trunc(50, true) }
        <br />
        <small>
          {props.authors.join(', ').trunc(50, true)}
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
