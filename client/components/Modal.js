import React, { Component, PropTypes } from 'react';
import { changeModal } from '../actions/ModalActions';
import ModalLogin from '../components/ModalLogin';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  modal: PropTypes.string.isRequired,
};

class Modal extends Component {
  constructor(props) {
    super(props);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const { dispatch } = this.props;
    dispatch(changeModal(null));
  }

  renderContent() {
    const { modal } = this.props;
    switch (modal) {
      case 'login':
        return <ModalLogin />;
      default:
        return <div></div>;
    }
  }

  render() {
    return (
      <div className="modal" onClick={this.closeModal}>
        {this.renderContent()}
      </div>
    );
  }
}

Modal.propTypes = propTypes;

export default Modal;
