import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';

class Link extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const {dispatch, path} = this.props;
        dispatch(navigateTo(path));
    }

    render() {
        const {children, className} = this.props;

        return (
            <a className={className} onClick={this.handleClick}>{children}</a>
        );
    }
}

Link.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    path: PropTypes.array.isRequired
};

export default Link;
