import React from 'react'
import { Form } from 'react-bootstrap'
import { Col, Row } from 'react-flexbox-grid'
import { reduxForm, Field } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

const Info = (props) => {
  const { handleSubmit } = props
  // #todo: understand the handleSubmit thing here
  return (
    <Form onSubmit={handleSubmit((values) => { props.updateBook(values) })} horizontal>
      <Row>
        <Col xs={12}>
          <p className="bg-info">
            Use this page to keep track this book's details.
          </p>
        </Col>
      </Row>
      <br/>
      <Row style={{ marginBottom: 12 }}>
        <Col className='control-label' xs={12} sm={4}>
          Where are you with this book?
        </Col>
        <Col xs={12} sm={8}>
          <Field className='form-control' name='status' component='select' placeholder='Status'>
            <option value='queue'>I plan on reading it.</option>
            <option value='current'>I'm currently reading it.</option>
            <option value='finished'>I've finished it!</option>
          </Field>
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col className='control-label' xs={12} sm={4}>
          Why this book?
        </Col>
        <Col xs={12} sm={8}>
          <Field className='form-control' name='reason' component='textarea' placeholder='Sarah recommended it when we were talking about great page-turners.'>
          </Field>
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col className='control-label' xs={12} sm={4}>
          How many pages total?
        </Col>
        <Col xs={12} sm={8}>
          <Field className='form-control' name='totalPages' component='input' type='number' placeholder='0' />
        </Col>
      </Row>
      <Row style={{ marginBottom: 12 }}>
        <Col className='control-label' xs={12} sm={4}>
          How would you rate this book?
        </Col>
        <Col xs={12} sm={8}>
          <Field className='form-control' name='rating' component='select' value='0'>
            <option value='5'>😃 Absolutely loved it.</option>
            <option value='4'>🙂 It was pretty good.</option>
            <option value='3'>😒 Decent.</option>
            <option value='2'>😖 Ehh, it was a struggle.</option>
            <option value='1'>😖 Not worth finishing.</option>
            <option value='0'>🤔 Haven't decided.</option>
          </Field>
        </Col>
      </Row>
      <Row>
        <Col smOffset={4} xs={12} sm={8}>
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
          {'   '}<span className='text-warning'>{props.errorMessage}</span>
        </Col>
      </Row>
    </Form>
  )
}

Info.propTypes = {
  updateBook: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  deleteBook: React.PropTypes.func,
  errorMessage: React.PropTypes.string,
  loading: React.PropTypes.bool
}

export default reduxForm({
  form: 'info'  // a unique identifier for this form
})(Info)
