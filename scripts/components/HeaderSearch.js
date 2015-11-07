import React, {Component, PropTypes} from 'react';
import {navigateTo} from '../actions/navigator';

class HeaderSearch extends Component {
    constructor(props) {
        super(props);
        this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    }

    componentDidMount() {
        document.addEventListener('keypress', (event) => {
            const keyCode = event.keyCode || event.which;
            if (keyCode === 47) {
                event.preventDefault();
                React.findDOMNode(this.refs.query).focus();
            }
        });
    }

    handleOnKeyPress(e) {
        if (e.charCode === 13) {
            const value = e.currentTarget.value.trim();
            if (value !== '') {
                this.props.dispatch(navigateTo({path: ['songs'], query: {q: value}}));
            }
        }
    }

    render() {
        return (
            <div className='header-search'>
                <i className='icon ion-search'></i>
                <input ref="query" className='header-search-input' placeholder='SEARCH' onKeyPress={this.handleOnKeyPress} type='text' />
            </div>
        );
    }
}

export default HeaderSearch;
