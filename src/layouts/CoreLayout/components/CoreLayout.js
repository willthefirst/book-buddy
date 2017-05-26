import React, { Component } from 'react'
import Header from 'components/Header'
import Footer from 'components/Footer'
import { Grid, Row, Col } from 'react-flexbox-grid'
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
        <Grid fluid className='body-container core-layout__viewport'>
          {this.props.children}
        </Grid>
        <Footer />
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
