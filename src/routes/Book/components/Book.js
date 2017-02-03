import React from 'react'
import { Button, Col, Row, Tabs, Tab } from 'react-bootstrap';

export const Book = (props) => (
  <div>
    <Row>
      <Col sm={3} >
        <img src="http://placehold.it/200x300" className="img-responsive" style={{ marginBottom: '24px' }} />
      </Col>
      <Col sm={9}>
        <Tabs defaultActiveKey={1} bsStyle="pills" id="book-info">
          <Tab eventKey={1} title="Progress">Progress content</Tab>
          <Tab eventKey={2} title="Notes">Notes content</Tab>
          <Tab eventKey={3} title="Info">Info content</Tab>
        </Tabs>
      </Col>
    </Row>
  </div>
)

Book.propTypes = {

}

export default Book
