import React from 'react'
import { Row, Col } from 'react-flexbox-grid'
import './Footer.scss'

let Footer = (props) => {
  return (
    <div className="footer-container">
      <Row>
        <Col xs={12}>
          BookBuddy is in beta. For bugs and questions, contact <a href="mailto:will@mg.bookbuddy.me">will@mg.bookbuddy.me</a>.
        </Col>
      </Row>
    </div>
  )
}

export default Footer
