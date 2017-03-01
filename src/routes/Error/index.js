import React from 'react'

const Error = (props) => {
  return (
    <h1>Sorry, that page doesn't exist!</h1>
  )
}

export default (store) => ({
  path : '*',
  component: Error
})
