import React from 'react'
import { Button, Form, FormGroup, ControlLabel } from 'react-bootstrap'
import { Col, Row } from 'react-flexbox-grid'
import { reduxForm, Field } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Info = (props) => {
  const { handleSubmit } = props
  // #todo: understand the handleSubmit thing here
  return (
    <Form onSubmit={handleSubmit((values) => { props.updateBook(values) })} horizontal>
      <Row style={{marginBottom: 12}}>
        <Col className='control-label' xs={12} sm={2}>
          Status
        </Col>
        <Col xs={12} sm={10}>
          <Field className='form-control' name='status' component='select' placeholder='Status'>
            <option value='queue'>Queue</option>
            <option value='current'>Current</option>
            <option value='finished'>Finished</option>
          </Field>
        </Col>
      </Row>
      <Row style={{marginBottom: 12}}>
        <Col className='control-label' xs={12} sm={2}>
          Total Pages
        </Col>
        <Col xs={12} sm={10}>
          <Field className='form-control' name='totalPages' component='input' type='number' placeholder='0' />
        </Col>
      </Row>
      <Row>
        <Col smOffset={2} xs={12} sm={10}>
          <LaddaButton
            loading={props.loading}
            className='btn btn-primary'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
            >
            Save
          </LaddaButton>
          {'  '}
          <LaddaButton
            onClick={handleSubmit((values) => { props.deleteBook(values) })}
            className='btn btn-danger'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
            >
            Delete
          </LaddaButton>
          {"   "}<span className="text-warning">{props.errorMessage}</span>
        </Col>
      </Row>
    </Form>
  )
}

Info.propTypes = {
  updateBook : React.PropTypes.func.isRequired,
  handleSubmit : React.PropTypes.func.isRequired,
  deleteBook : React.PropTypes.func
}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)
