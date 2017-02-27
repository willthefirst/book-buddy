import React, { Component } from 'react'
import Header from 'components/Header'
import '../CoreLayout.scss'
import '../../../styles/core.scss'

class CoreLayout extends Component {
  componentWillMount() {
    // When page refreshes, if we have a token stored, refresh users info from server
    this.props.meFromToken();
  }

  componentDidUpdate(prevProps) {
    const { redirectUrl, isLoggedIn } = this.props
    this.props.redirectAfterAuth(prevProps, redirectUrl, isLoggedIn);
  }

  render() {
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
  children : React.PropTypes.element.isRequired
}

export default CoreLayout
