import React from 'react'
import { Form, FormGroup } from 'react-bootstrap'
import { reduxForm, Field } from 'redux-form'

let SearchInput = (props) => {
  return (
    <Form>
      <FormGroup bsSize='lg'>
        <Field
          className='form-control'
          name='title'
          component='input'
          type='text'
          onChange={(e) => { props.handleChange(e.target.value) }}
          placeholder='Add from your library...' />
      </FormGroup>
    </Form>
  )
}

SearchInput = reduxForm({
  form: 'SearchInput'
})(SearchInput)

SearchInput.propTypes ={
  form: React.PropTypes.string.isRequired
}

export default SearchInput
