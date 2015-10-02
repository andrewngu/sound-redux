import React, {Component, PropTypes} from 'react';

class Popover extends Component {
    constructor(props) {
        super(props);
        this.toggleIsOpen = this.toggleIsOpen.bind(this);
        this.state = {isOpen: false};
    }

    toggleIsOpen() {
        this.setState({isOpen: !this.state.isOpen});
    }

    render() {
        return (
            <div
                className={this.props.className + ' popover' + (this.state.isOpen ? ' open' : '')}
                onClick={this.toggleIsOpen}>
                {this.props.children}
            </div>
        )
    }
}

export default Popover;
