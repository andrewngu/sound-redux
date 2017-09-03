/* global document */
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  navigateTo: PropTypes.func.isRequired,
};

class NavSearch extends Component {
  constructor(props) {
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.input = null;
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown, false);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown, false);
  }

  onKeyDown(e) {
    if (e.keyCode === 191) {
      const insideInput = e.target.tagName.toLowerCase().match(/input|textarea/);
      if (!insideInput) {
        e.preventDefault();
        this.input.focus();
      }
    }
  }

  onKeyPress(e) {
    if (e.charCode === 13) {
      const { navigateTo } = this.props;
      const value = e.currentTarget.value.trim();
      if (value !== '') {
        navigateTo({
          keys: {},
          path: SONGS_PATH,
          options: { q: value },
        });
      }
    }
  }

  render() {
    return (
      <div className="nav-search">
        <i className="nav-search__icon ion-search" />
        <input
          ref={(node) => { this.input = node; }}
          className="nav-search__input"
          placeholder="SEARCH"
          onKeyPress={this.onKeyPress}
          type="text"
        />
      </div>
    );
  }
}

NavSearch.propTypes = propTypes;

export default NavSearch;
