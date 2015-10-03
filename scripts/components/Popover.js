import React, {Component, PropTypes} from 'react';

class Popover extends Component {
    constructor(props) {
        super(props);
        this.handleOutsideClick = this.handleOutsideClick.bind(this);
        this.onOutsideClick = this.onOutsideClick.bind(this);
        this.toggleIsOpen = this.toggleIsOpen.bind(this);

        this.state = {isOpen: false};
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.onOutsideClick);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onOutsideClick);
    }

    handleOutsideClick() {
        this.setState({
            isOpen: false
        });
    }

    onOutsideClick(e) {
        if (!this.state.isOpen) {
            return;
        }

        e.stopPropagation();
        const localNode = React.findDOMNode(this);
        let source = e.target;

        while(source.parentNode) {
            if (source === localNode) {
                return;
            }
            source = source.parentNode;
        }
        this.handleOutsideClick();
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
