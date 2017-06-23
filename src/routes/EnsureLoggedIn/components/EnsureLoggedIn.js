import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { applyAuthToken } from 'util/common'

class EnsureLoggedIn extends Component {
  componentWillMount () {
    const { setRedirectUrl, isLoggedIn } = this.props
    let { currentUrl } = this.props

    if (!isLoggedIn) {
      // If user goes to home page while not logged in, redirect them to daily
      if (currentUrl === '/') {
        currentUrl = 'daily'
      }
      setRedirectUrl(currentUrl)

      if (applyAuthToken().headers.Authorization) {
        // If we have a token stored, refresh users info from server, don't redirect
        this.props.meFromToken(currentUrl)
      } else {
        browserHistory.replace('/welcome')
      }
    }
  }

  render () {
    if (this.props.isLoggedIn) {
      return this.props.children
    } else {
      return null
    }
  }
}

EnsureLoggedIn.propTypes = {
  setRedirectUrl: React.PropTypes.func.isRequired,
  meFromToken: React.PropTypes.func.isRequired,
  children: React.PropTypes.element.isRequired,
  currentUrl: React.PropTypes.string,
  isLoggedIn: React.PropTypes.bool.isRequired
}

export default EnsureLoggedIn
