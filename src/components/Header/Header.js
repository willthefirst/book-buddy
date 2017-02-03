import React from 'react'
import { IndexLink, Link } from 'react-router'
import { Col, Row } from 'react-bootstrap';
import './Header.scss'

export const Header = () => (
  <div>
    <h1>Book Buddy</h1>
    <Row style={{textAlign: 'left', fontSize: '18px'}}>
      <Col sm='12'>
        <IndexLink to='/library' activeClassName='route--active'>
          My Books
        </IndexLink>
        {' > '}
        <Link to='/book' activeClassName='route--active'>
          The Sample Book Title
        </Link>
      </Col>
    </Row>
  </div>
)

export default Header
