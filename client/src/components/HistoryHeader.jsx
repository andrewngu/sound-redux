import PropTypes from 'prop-types';
import React, { Component } from 'react';

const propTypes = {
  nextPlaylist: PropTypes.func.isRequired,
  playlistTitle: PropTypes.string.isRequired,
  prevPlaylist: PropTypes.func.isRequired,
};

class HistoryMainHeader extends Component {
  constructor() {
    super();
    this.onClickPrev = this.onClickPrev.bind(this);
    this.onClickNext = this.onClickNext.bind(this);
  }

  onClickNext() {
    const { nextPlaylist } = this.props;
    nextPlaylist();
  }

  onClickPrev() {
    const { prevPlaylist } = this.props;
    prevPlaylist();
  }

  render() {
    const { playlistTitle } = this.props;

    return (
      <div className="history__header">
        <div className="history__header__button">
          <i className="history__header__button__icon ion-chevron-left" />
        </div>
        <div className="history__header__title">
          {playlistTitle}
        </div>
        <div className="history__header__button">
          <i className="history__header__button__icon ion-chevron-right" />
        </div>
      </div>
    );
  }
}

HistoryMainHeader.propTypes = propTypes;

export default HistoryMainHeader;
