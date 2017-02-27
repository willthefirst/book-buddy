import React, { Component } from 'react'
import { browserHistory } from 'react-router';
import { applyAuthToken } from 'util/common'

class EnsureLoggedIn extends Component {
  componentWillMount() {
    const { setRedirectUrl, currentUrl, isLoggedIn } = this.props
    if (!isLoggedIn) {
      setRedirectUrl(currentUrl);
      if (applyAuthToken()) {
        // If we have a token stored, refresh users info from server, don't redirect
        this.props.meFromToken();
      } else {
        browserHistory.push("/auth/login")
      }
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
