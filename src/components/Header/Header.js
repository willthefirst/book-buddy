import React, { Component } from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import './Header.scss'

class Header extends Component {


  render() {
    const { isLoggedIn } = this.props

    let navLinks = (
      <Nav pullRight>
        <LinkContainer to={{ pathname: '/books' }}>
          <NavItem eventKey={1}>My Books</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '/book/new' }}>
          <NavItem eventKey={2}>Add A Book</NavItem>
        </LinkContainer>
        <LinkContainer to={{ pathname: '#' }}>
          <NavItem eventKey={3}>My Account</NavItem>
        </LinkContainer>
      </Nav>
    )

    if (!isLoggedIn) {
      navLinks = (
        <Nav pullRight>
          <LinkContainer to={{ pathname: '/books' }}>
            <NavItem eventKey={1}>Login</NavItem>
          </LinkContainer>
          <LinkContainer to={{ pathname: '#' }}>
            <NavItem eventKey={2}>Register</NavItem>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Navbar staticTop>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Book Buddy</a>
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
