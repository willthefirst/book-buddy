import React from 'react'
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import './Header.scss'

export const Header = () => (
    <Navbar staticTop>
      <Navbar.Header>
        <Navbar.Brand>
          <a href="#">Book Buddy</a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem eventKey={1} href="/books">My Books</NavItem>
          <NavItem eventKey={2} href="/new">Add A Book</NavItem>
          <NavItem eventKey={3} href="/#">My Account</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
)

export default Header
