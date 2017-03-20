import React, { Component } from 'react'
import Header from 'components/Header'
import { Grid } from 'react-flexbox-grid'
import '../CoreLayout.scss'
import '../../../styles/core.scss'

class CoreLayout extends Component {
  componentDidUpdate (prevProps) {
    const { redirectUrl, isLoggedIn } = this.props
    this.props.redirectAfterAuth(prevProps, redirectUrl, isLoggedIn)
  }

  render () {
    return (
      <div>
        <Header />
        <div className='container core-layout__viewport'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

CoreLayout.propTypes = {
  children : React.PropTypes.element.isRequired,
  isLoggedIn: React.PropTypes.bool.isRequired,
  redirectUrl: React.PropTypes.string.isRequired,
  redirectAfterAuth: React.PropTypes.func.isRequired
}

export default CoreLayout
