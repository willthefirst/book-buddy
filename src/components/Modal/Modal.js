import React, {Component} from 'react'
import { Button, Modal, Clearfix, Row } from 'react-bootstrap'
import { Link } from 'react-router'

const SearchModal = React.createClass({
  getInitialState() {
    return { showModal: false };
  },

  close() {
    this.setState({ showModal: false });
  },

  open() {
    this.setState({ showModal: true });
  },

  render() {
    return (
      <div>
        <Button
          bsStyle="info"
          onClick={this.open}
          >
          {this.props.btnText}
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            {this.props.children}
          </Modal.Body>
        </Modal>
      </div>
    )
  }
})

SearchModal.propTypes = {
  btnText: React.PropTypes.string.isRequired
}

export default SearchModal
