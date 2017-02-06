import React from 'react'
import { Col, Button, Form, FormGroup, ControlLabel, FormControl, Checkbox, Radio } from 'react-bootstrap'


/* #todo Turn form controlled into controlled inputs that auto-update with server, not placeholder stuff.*/

export const Info = (props) => (
  <Form horizontal>
    <FormGroup controlId="formHorizontalTitle">
      <Col componentClass={ControlLabel} sm={2}>
        Title
      </Col>
      <Col sm={10}>
        <FormControl type="text" placeholder={props.title || "Title"} />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalAuthor">
      <Col componentClass={ControlLabel} sm={2}>
        Author
      </Col>
      <Col sm={10}>
        <FormControl type="text" placeholder={ props.author || "Author"} />
      </Col>
    </FormGroup>

    <FormGroup controlId="formHorizontalStatus">
      <Col componentClass={ControlLabel} sm={2}>
        Status
      </Col>
      <Col sm={10}>
        <FormControl componentClass="select" placeholder={ props.status || "Status"}>
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
        <FormControl type="number" placeholder={ props.totalPages || "0"} />
      </Col>
    </FormGroup>

    <FormGroup>
      <Col smOffset={2} sm={10}>
        <Button type="submit" onSubmit={ props.updateBook(props.id) }>
          Save
        </Button>
      </Col>
    </FormGroup>
  </Form>
)

Info.propTypes = {

}

export default Info
