import React from 'react'

const AuthIndex = (props) => {
  return (
    <div>{props.children}</div>
  )
}

AuthIndex.propTypes = {
  children: React.PropTypes.element.isRequired
}

export default AuthIndex
