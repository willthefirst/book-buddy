import React from 'react'

export const Counter = (props) => (
  <div style={{ margin: '0 auto' }} >
    <h2>BOOK</h2>
  </div>
)

Counter.propTypes = {
  counter     : React.PropTypes.number.isRequired,
  doubleAsync : React.PropTypes.func.isRequired,
  increment   : React.PropTypes.func.isRequired
}

export default Counter
