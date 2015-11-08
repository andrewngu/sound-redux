import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';

class NavSearch extends Component {
    constructor(props) {
        super(props);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
        this.onSlashPress = this.onSlashPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', this.onSlashPress, false);
    }

    componentWillUnmount() {
        document.removeEventListener('keyCode', this.onSlashPress, false)
    }

    handleOnKeyPress(e) {
        if (e.charCode === 13) {
            const value = e.currentTarget.value.trim();
            if (value !== '') {
                this.props.dispatch(navigateTo({path: ['songs'], query: {q: value}}));
            }
        }
    }

    onSlashPress(e) {
        const keyCode = e.keyCode || e.which;
        const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
        if (keyCode === 47 && !isInsideInput) {
            e.preventDefault();
            React.findDOMNode(this.refs.query).focus();
        }
    }

    render() {
        return (
            <div className='nav-search'>
                <i className='icon ion-search'></i>
                <input ref="query" className='nav-search-input' placeholder='SEARCH' onKeyPress={this.handleOnKeyPress} type='text' />
            </div>
        );
    }
}

export default NavSearch;
