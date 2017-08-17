import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { navigateTo } from '../actions/NavigatorActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
};

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.handleOnKeyPress = this.handleOnKeyPress.bind(this);
    this.handleSlashPress = this.handleSlashPress.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keypress', this.handleSlashPress, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.handleSlashPress, false);
  }

  handleOnKeyPress(e) {
    if (e.charCode === 13) {
      const { dispatch } = this.props;
      const value = e.currentTarget.value.trim();
      if (value !== '') {
        dispatch(navigateTo({ path: ['songs'], query: { q: value } }));
      }
    }
  }

  handleSlashPress(e) {
    const keyCode = e.keyCode || e.which;
    const isInsideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
    if (keyCode === 47 && !isInsideInput) {
      e.preventDefault();
      this.query.focus();
    }
  }

  render() {
    return (
      <div className="nav-search">
        <i className="icon ion-search" />
        <input
          ref={(node) => { this.query = node; }}
          className="nav-search-input"
          placeholder="SEARCH"
          onKeyPress={this.handleOnKeyPress}
          type="text"
        />
      </div>
    );
  }
}

NavSearch.propTypes = propTypes;

export default NavSearch;
