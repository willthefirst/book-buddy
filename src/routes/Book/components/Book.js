import React, { Component } from 'react'
import { Col, Row, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

class Book extends Component {
  componentWillMount () {
    // Get book from server
    this.props.fetchBook(this.props.params.id)
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
            <img src={this.props.thumbnailUrl}
              className='img-responsive'
              style={{ marginBottom: '24px', width: '100%' }} />
            <Nav bsStyle='tabs' id='book-info' stacked bsStyle="pills">
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
          </Col>
          <Col sm={10}>
            <div>
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
  children: React.PropTypes.element,
  fetchBook: React.PropTypes.func,
  authors: React.PropTypes.string,
  params: React.PropTypes.object,
  book_id: React.PropTypes.string
}

export default Book
