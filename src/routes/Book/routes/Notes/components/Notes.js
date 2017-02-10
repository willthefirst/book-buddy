import React from 'react'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'

export const Notes = (props) => (
  <FormGroup controlId="formControlsTextarea">
    <FormControl componentClass="textarea" placeholder="Write your notes here..." />
  </FormGroup>
)

Notes.propTypes = {

}

export default Notes
