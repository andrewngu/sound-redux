import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Modal from '../components/Modal';

const propTypes = {
  modal: PropTypes.string,
};

class ModalContainer extends Component {
  render() {
    if (!this.props.modal) {
      return <div />;
    }

    return <Modal {...this.props} />;
  }
}

ModalContainer.propTypes = propTypes;

function mapStateToProps(state) {
  const { modal } = state;

  return { modal };
}

export default connect(mapStateToProps)(ModalContainer);
