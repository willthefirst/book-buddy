import React from 'react'
import BookThumbnail from 'components/BookThumbnail'
import { Link } from 'react-router'
import { Row, Col } from 'react-flexbox-grid'
import { Form, FormGroup, InputGroup, Image } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'
import LaddaButton, { L, SLIDE_DOWN } from 'react-ladda'

let DailySingleForm = (props) => {
  let deleteButton

  if (props.handleDelete) {
    deleteButton = (
      <LaddaButton
        onClick={props.handleSubmit((values) => { props.handleDelete(values) })}
        className='btn btn-danger'
        data-size={L}
        data-style={SLIDE_DOWN}
        data-spinner-color='#ddd'
        >
        <i className="fa fa-trash" aria-hidden="true"></i>
      </LaddaButton>
    )
  }

  return (
    <Form onSubmit={props.handleSubmit}>

          <InputGroup style={{float:'left', width: 80, marginRight: 6}}>
            <span className='input-group-addon' id='basic-addon1'>p.</span>
            <Field
              name='currentPage'
              className='form-control'
              component='input'
              type='number'
              aria-describedby='basic-addon1'
              placeholder='0'
              style={{'width': 100}}
              required
              />
          </InputGroup>
          <LaddaButton
            className='btn btn-primary'
            data-size={L}
            data-style={SLIDE_DOWN}
            data-spinner-color='#ddd'
            >
            <i className="fa fa-check-circle" aria-hidden="true"></i>
          </LaddaButton>
          {'  '}
          { deleteButton }

    </Form>
  )
}

DailySingleForm.propTypes = {
  handleSubmit: React.PropTypes.func,
  handleDelete: React.PropTypes.func
}

DailySingleForm = reduxForm()(DailySingleForm)

let DailySingle = (props) => {
  return (
      <Row middle='xs' style={{
          paddingBottom:'16px',
          marginBottom: '16px',
          borderBottom:'1px solid #efefef'
        }}>
        <Link to={`/book/id/${props.bookId}/progress`} style={{float:'left', marginRight: 6}}>
          <Image src={props.thumbnailUrl} style={{maxHeight: 80}} responsive />
        </Link>
        {'  '}
        <DailySingleForm
          initialValues={{
            date: props.date,
            bookId: props.bookId,
            currentPage: props.currentPage
          }}
          enableReinitialize
          form={props.formId || props.bookId}
          onSubmit={props.handleSubmit}
          handleDelete={props.handleDelete}
          />
      </Row>
  )
}

DailySingle.propTypes = {
  title: React.PropTypes.string.isRequired,
  authors: React.PropTypes.array.isRequired,
  thumbnailUrl: React.PropTypes.string.isRequired,
  bookId: React.PropTypes.string.isRequired,
  formId: React.PropTypes.string,
  currentPage: React.PropTypes.number,
  handleSubmit: React.PropTypes.func.isRequired,
  date: React.PropTypes.string.isRequired,
  horizontal: React.PropTypes.bool,
  handleDelete: React.PropTypes.func
}

export default DailySingle
