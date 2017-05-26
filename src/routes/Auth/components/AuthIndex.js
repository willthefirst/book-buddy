import React from 'react'
import { Row, Col } from 'react-flexbox-grid'

const AuthIndex = (props) => {
  return (
    <div className='full-width'>
      <Row>
        <Col xs={12} sm={4} smOffset={4} style={{textAlign: 'center'}}>
          {props.children}
        </Col>
      </Row>
    </div>
  )
}

AuthIndex.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default AuthIndex
