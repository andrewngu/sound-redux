import React, { Component, PropTypes } from 'react';

const propTypes = {
  index: PropTypes.number.isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
};

class SongsBodyCardMobileEvents extends Component {
  constructor() {
    super();
    this.onMouseDown = this.onMouseDown.bind(this);
  }

  onMouseDown() {
    const { index, playlist, playSong } = this.props;
    playSong(playlist, index);
  }

  render() {
    return (
      <div
        className="songs-body-card__mobile-events"
        onMouseDown={this.onMouseDown}
        role="button"
        tabIndex="0"
      />
    );
  }
}


SongsBodyCardMobileEvents.propTypes = propTypes;

export default SongsBodyCardMobileEvents;
