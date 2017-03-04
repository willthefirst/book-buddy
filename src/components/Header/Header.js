import React, { Component } from 'react'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router'
import './Header.scss'

class Header extends Component {

  render () {
    const { isLoggedIn, userEmail } = this.props

    let navLinks = (
      <Nav pullRight>
        <LinkContainer to={{ pathname: '/auth/login' }}>
          <NavItem>Login</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/auth/register' }}>
          <NavItem>Register</NavItem>
        </LinkContainer>
      </Nav>
    )

    if (isLoggedIn) {
      navLinks = (
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/books' }}>
            <NavItem>My Books</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/book/new' }}>
            <NavItem>Add A Book</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '/account' }}>
            <NavDropdown title='Account' id='basic-nav-dropdown'>
              <MenuItem>Email: {userEmail}</MenuItem>
              <MenuItem divider />
              <LinkContainer to={{ pathname: '/auth/logout' }}>
                <MenuItem>Logout</MenuItem>
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
            <Link to='/'>Book Buddy</Link>
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

Header.propTypes = {
  isLoggedIn: React.PropTypes.bool.isRequired,
  userEmail: React.PropTypes.string.isRequired
}

export default Header
