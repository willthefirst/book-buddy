import React, { Component } from 'react'

class Logout extends Component {
  componentWillMount() {
    this.props.handleLogout();
  }

  render() {
    return (
      <div>You have been logged out. Go to /login to login again.</div>
    )
  }
}

Logout.propTypes = {}

export default Logout
