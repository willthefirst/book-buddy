import React from 'react'
import { Button, Modal } from 'react-bootstrap'

let SearchModal = React.createClass({
  getInitialState () {
    return { showModal: this.props.showModal || false }
  },

  close () {
    this.setState({ showModal: false })
  },

  open () {
    this.setState({ showModal: true })
  },

  render () {
    return (
      <div>
        <Button
          bsStyle='info'
          bsSize='lg'
          onClick={this.open}>
          {this.props.btnText}
        </Button>
        <Modal bsSize='lg' show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
})

SearchModal.propTypes = {
  btnText: React.PropTypes.element.isRequired,
  children: React.PropTypes.array,
  showModal: React.PropTypes.bool
}

export default SearchModal
