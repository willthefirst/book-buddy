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
      <div className='site-container'>
        <div className='header-container'>
          <Header />
        </div>
        <Grid fluid className='body-container core-layout__viewport'>
          {this.props.children}
        </Grid>
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
