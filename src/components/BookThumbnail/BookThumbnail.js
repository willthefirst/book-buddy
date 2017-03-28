import React from 'react'
import { Col, Row } from 'react-flexbox-grid'
import { Link } from 'react-router'
import './BookThumbnail.scss'
import { truncate } from 'util/common'

const BookThumbnail = (props) => {
  let info = (
    <h4>
      { truncate(props.title, 50, true) }
      <br />
      <small>
        { truncate(props.authors.join(', '), 50, true)}
      </small>
    </h4>
  )

  let thumbnail = (
    <img src={props.thumbnailUrl} className='book-thumb__img'/>
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



  if (props.horizontal) {
    return (
      <Col xs={10} sm={4} style={{marginRight:40}}>
        <Row style={{height: '100%'}} middle='xs'>
          <Col xs={4}>
            { thumbnail }
          </Col>
          <Col xs={8}>
            { props.children }
          </Col>
        </Row>
      </Col>
    )
  } else {
    return (
      <Col xs={4} sm={3} md={2} className='book-thumb__container'>
        <div>
          { thumbnail }
          { info }
        </div>
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
