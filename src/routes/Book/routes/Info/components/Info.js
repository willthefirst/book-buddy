import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'

export const Info = (props) => (
  <Form horizontal>
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
)

Info.propTypes = {

}

export default Info
