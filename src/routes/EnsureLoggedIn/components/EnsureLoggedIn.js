import React, { Component } from 'react'
import { browserHistory } from 'react-router';

class EnsureLoggedIn extends Component {
  componentDidMount() {
    const { setRedirectUrl, currentUrl, isLoggedIn } = this.props

    console.log('EnsureLoggedIn mounted');
    if (!isLoggedIn) {
      console.log('Not logged in');
      setRedirectUrl(currentUrl);
      browserHistory.push("/auth/login")
    }
  }

  render() {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

export default EnsureLoggedIn
