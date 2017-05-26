
import React, { Component } from 'react'
import { Nav, NavItem } from 'react-bootstrap'
import { Col, Row } from 'react-flexbox-grid'
import { LinkContainer } from 'react-router-bootstrap'

class Book extends Component {
  componentWillMount () {
    // Get book from server
    this.props.fetchBook(this.props.params.id)
  }

  render () {
    return (
      <div className='full-width'>
        <Row>
          <Col xs={12} sm={2}  style={{marginBottom: 22}}>
            <Row>
              <Col xs={3} sm={12}>
                <img src={this.props.thumbnailUrl}
                  className='img-responsive book-thumb--shadow'
                  style={{}} />
              </Col>
              <Col xs={9} sm={12}>
                <h3>
                  {this.props.title}
                  <br />
                  <small>{this.props.authors}</small>
                </h3>
              </Col>
            </Row>
          </Col>
          <Col xs={12} sm={10}>
            <Nav bsStyle='tabs' id='book-info' style={{marginBottom: 22}}>
              <LinkContainer to={{ pathname: `/book/id/${this.props.params.id}/progress` }}>
                <NavItem eventKey={1} title='Progress'>Progress</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: `/book/id/${this.props.params.id}/notes` }}>
                <NavItem eventKey={2} title='Notes'>Notes</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: `/book/id/${this.props.params.id}/info` }}>
                <NavItem eventKey={3} title='Info'>Info</NavItem>
              </LinkContainer>
            </Nav>
            {this.props.children}

          </Col>
        </Row>
        <Row>
          <Col xs={12} sm={2} >

          </Col>
          <Col xs={12} sm={10}>

          </Col>
        </Row>
      </div>
    )
  }
}

Book.propTypes = {
  title: React.PropTypes.string,
  thumbnailUrl: React.PropTypes.string,
  children: React.PropTypes.element,
  fetchBook: React.PropTypes.func,
  authors: React.PropTypes.string,
  params: React.PropTypes.object,
  book_id: React.PropTypes.string
}

export default Book
