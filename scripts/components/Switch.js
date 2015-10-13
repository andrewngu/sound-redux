import React, {Component, PropTypes} from 'react';

class Switch extends Component {
    render() {
        const {isOn, toggleFunc} = this.props;

        return (
            <div
                className={'switch' + (isOn ? ' on' : '')}
                onClick={toggleFunc}>
                <div className='switch-button'></div>
            </div>
        );
    }
}

Switch.propTypes = {
    isOn: PropTypes.bool.isRequired,
    toggleFunc: PropTypes.func.isRequired
};

export default Switch;
