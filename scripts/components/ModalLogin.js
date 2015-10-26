import React, {Component, PropTypes} from 'react';

class ModalLogin extends Component {
    render() {
        return (
            <div className='modal-content' onClick={(e) => {e.stopPropagation()}}>
                <div className='modal-header'>Login to your Soundcloud account</div>
                <div className='modal-body'></div>
                <div className='modal-footer'></div>
            </div>
        );
    }
}

export default ModalLogin;
