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

  if (props.linkTo) {
    info = (
      <Link to={props.linkTo}>
        { info }
      </Link>
    )
  }

  if (props.horizontal) {
    return (
      <Col xs={10} sm={4} style={{marginRight:40}}>
        <Row style={{height: '100%'}} middle='xs'>
          <Col xs={4}>
            <img src={props.thumbnailUrl} className='book-thumb__img' height={150}/>
          </Col>
          <Col xs={8} >
            { props.children }
          </Col>
        </Row>
      </Col>
    )
  } else {
    return (
      <Col xs={4} sm={3} md={2} className='book-thumb__container'>
        <div>
          <img src={props.thumbnailUrl} className='book-thumb__img' />
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
