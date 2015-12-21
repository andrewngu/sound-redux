import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

class Popover extends Component {
    constructor(props) {
        super(props);
        if (props.children.length !== 2) {
            throw new Error('Popover component requires exactly 2 children');
        }

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

        const localNode = ReactDOM.findDOMNode(this);
        let source = e.target;

        if (!localNode.contains(source)) {
            this.handleOutsideClick();
        }
    }

    toggleIsOpen(e) {
        e.stopPropagation();
        let source = e.target;

        while(source.parentNode) {
            if (source.getAttribute("class") &&
                source.getAttribute("class").indexOf("handleToggle") > -1) {
                this.setState({isOpen: !this.state.isOpen});
                source = null;
                return;
            }
            source = source.parentNode;
        }
    }

    render() {
        return (
            <div
                className={this.props.className + ' popover' + (this.state.isOpen ? ' open' : '')}
                onClick={this.toggleIsOpen}>
                <div className="handleToggle">
                  {this.props.children[0]}
                </div>
                <div>
                  {this.state.isOpen ? this.props.children[1] : null}
                </div>
            </div>
        )
    }
}

export default Popover;
