import React, { Component } from 'react'
import { Col } from 'react-flexbox-grid'


class VerifyEmail extends Component {
  componentDidMount() {
    this.props.verifyEmail(this.props.params.token)
  }

  render() {
    return (
      <div>
        <h2>Verifying...</h2>
      </div>
    )
  }
}

VerifyEmail.propTypes = {
  verifyEmail: React.PropTypes.func.isRequired
}

export default VerifyEmail
