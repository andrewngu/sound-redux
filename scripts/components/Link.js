import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';
import {constructUrl} from '../utils/RouteUtils';

class Link extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        const {dispatch, route} = this.props;
        dispatch(navigateTo(route));
    }

    render() {
        const {children, className, route, title} = this.props;

        return (
            <a className={className} title={title ? title : ''} href={`/#/${constructUrl(route)}`} onClick={this.handleClick}>{children}</a>
        );
    }
}

Link.propTypes = {
    className: PropTypes.string,
    dispatch: PropTypes.func.isRequired,
    route: PropTypes.object.isRequired,
    title: PropTypes.string
};

export default Link;
