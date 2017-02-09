import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.scss'

export const Header = () => (
  <Navbar staticTop>
    <Navbar.Header>
      <Navbar.Brand>
        <a href="/">Book Buddy</a>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <LinkContainer to={{ pathname: '/books' }}>
          <NavItem eventKey={1}>My Books</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/books/new' }}>
          <NavItem eventKey={2}>Add A Book</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '#' }}>
          <NavItem eventKey={3}>My Account</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
