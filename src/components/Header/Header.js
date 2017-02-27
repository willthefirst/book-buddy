import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import  { Link } from 'react-router'
import './Header.scss'

class Header extends Component {


  render() {
    const { isLoggedIn, userEmail } = this.props

    let navLinks = (
      <Nav pullRight>
        <LinkContainer to={{ pathname: '/auth/login' }}>
          <NavItem eventKey={1}>Login</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/auth/register' }}>
          <NavItem eventKey={2}>Register</NavItem>
        </LinkContainer>
      </Nav>
    )

    if (isLoggedIn) {
      navLinks = (
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/books' }}>
            <NavItem eventKey={1}>My Books</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/book/new' }}>
            <NavItem eventKey={2}>Add A Book</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '#' }}>
            <NavDropdown eventKey={3} title="Account" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Email: {userEmail}</MenuItem>
              <MenuItem divider />
              <LinkContainer to={{ pathname: '/auth/logout' }}>
                <MenuItem eventKey={3.2}>Logout</MenuItem>
              </LinkContainer>
            </NavDropdown>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Book Buddy</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            { navLinks }
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Header
