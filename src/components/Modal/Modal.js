import React, {Component} from 'react'
import { Button, Modal, Clearfix } from 'react-bootstrap'
import { Row } from 'react-flexbox-grid'
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
          bsSize="lg"
          onClick={this.open}
          >
          {this.props.btnText}
        </Button>
        <Modal bsSize="lg" show={this.state.showModal} onHide={this.close}>
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
