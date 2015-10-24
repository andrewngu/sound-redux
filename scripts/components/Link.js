import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';

class Link extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const {dispatch, path, query} = this.props;
        const route = {
            path,
            query: query ? query: {}
        };

        dispatch(navigateTo(route));
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
