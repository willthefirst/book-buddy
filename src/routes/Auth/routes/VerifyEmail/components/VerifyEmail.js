import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { Link } from 'react-router'

class VerifyEmail extends Component {
  componentDidMount () {
    this.props.verifyEmail(this.props.params.token)
  }

  render () {
    return (
      <div className='text-center'>
        {
          this.props.loading ? (
            <h2>Verifying your email...</h2>
          ) : (
            this.props.isVerified ? (
              <div>
                <h3 className='text-success'>Success!</h3>
                <p>I've succesfully verified your email.</p>
                <Link to='/auth/login'>
                  <Button bsSize='lg' bsStyle='success'>Log in to your new account</Button>
                </Link>
              </div>
            ) : (
              <div>
                <h3 className='text-danger'>Something went wrong with verifying your email.</h3>
                <p>{ this.props.error }</p>
              </div>
            )
          )
        }
      </div>
    )
  }
}

VerifyEmail.propTypes = {
  verifyEmail: React.PropTypes.func.isRequired,
  isVerified: React.PropTypes.bool.isRequired,
  error: React.PropTypes.string,
  loading: React.PropTypes.bool,
  params: React.PropTypes.object
}

export default VerifyEmail
