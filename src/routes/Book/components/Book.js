import React, { Component } from 'react'
import { Button, Col, Row, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap'

class Book extends Component {
  componentWillMount() {
    this.props.fetchBook(this.props.params.id);
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <Row>
          <Col sm={3} >
            {/* <img src="http://placehold.it/200x300" className="img-responsive" style={{ marginBottom: '24px', width: '100%' }} /> */}
          </Col>
          <Col sm={9}>
            <Nav bsStyle="tabs" id="book-info">
              <LinkContainer to={{ pathname: `/book/${this.props.params.id}/progress` }}>
                <NavItem eventKey={1} title="Progress">Progress</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: `/book/${this.props.params.id}/notes` }}>
                <NavItem eventKey={2} title="Notes">Notes</NavItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: `/book/${this.props.params.id}/info` }}>
                <NavItem eventKey={3} title="Info">Info</NavItem>
              </LinkContainer>
            </Nav>
            <div className="core-layout__viewport">
              {this.props.children}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

Book.propTypes = {

}

export default Book
