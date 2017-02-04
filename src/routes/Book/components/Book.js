import React from 'react'
import { Button, Col, Row, Tabs, Tab, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap';

export const Book = (props) => (
  <div>
    <h1>{props.book.title}</h1>
    <Row>
      <Col sm={3} >
        <img src="http://placehold.it/200x300" className="img-responsive" style={{ marginBottom: '24px', width: '100%' }} />
      </Col>
      <Col sm={9}>
        <Tabs defaultActiveKey={1} bsStyle="pills" id="book-info">
          <Tab eventKey={1} title="Progress">Progress content</Tab>
          <Tab eventKey={2} title="Notes">Notes content</Tab>
          <Tab eventKey={3} title="Info">

            <Form className="core-layout__viewport" horizontal>
              <FormGroup controlId="formHorizontalTitle">
                <Col componentClass={ControlLabel} sm={2}>
                  Title
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Title" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalAuthor">
                <Col componentClass={ControlLabel} sm={2}>
                  Author
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Author" />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalStatus">
                <Col componentClass={ControlLabel} sm={2}>
                  Status
                </Col>
                <Col sm={10}>
                  <FormControl componentClass="select" placeholder="Status">
                    <option value="current">Current</option>
                    <option value="queue">Queue</option>
                    <option value="finished">Finished</option>
                  </FormControl>
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalTotalPages">
                <Col componentClass={ControlLabel} sm={2}>
                  Total Pages
                </Col>
                <Col sm={10}>
                  <FormControl type="number" placeholder="0" />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button type="submit">
                    Save
                  </Button>
                </Col>
              </FormGroup>

            </Form>
          </Tab>
        </Tabs>
      </Col>
    </Row>
  </div>
)

Book.propTypes = {

}

export default Book
