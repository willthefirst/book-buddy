import React, { Component } from 'react'
import { Button, Col, Row, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Book extends Component {
  componentWillMount () {
    // Check to see if we have an active book in the store already.
    // If it's not the correct one (ie. doesn't match current URL, fetch the right one.)
    // Helpful to prevent client from making two requests to server when user creates a new book.
    if (this.props._id !== this.props.params.id) {
      this.props.fetchBook(this.props.params.id)
    }
  }

  render () {
    return (
      <div>
        <h1>
          {this.props.title}
          <br />
          <small>{this.props.authors}</small>
        </h1>
        <Row>
          <Col sm={2} >
            <img src={this.props.thumbnailUrl} className='img-responsive' style={{ marginBottom: '24px', width: '100%' }} />
          </Col>
          <Col sm={10}>
            <Nav bsStyle='tabs' id='book-info'>
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
            <div className='core-layout__viewport'>
              {this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Book.propTypes = {
  title: React.PropTypes.string,
  thumbnailUrl: React.PropTypes.string,
  authors: React.PropTypes.string,
  _id: React.PropTypes.string
}

export default Book
