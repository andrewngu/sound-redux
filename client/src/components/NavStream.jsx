import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Link from '../components/Link';
import { SONGS_PATH } from '../constants/RouterConstants';

const propTypes = {
  fetchNewStreamSongs: PropTypes.func.isRequired,
  loadNewStreamSongs: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  newStreamSongs: PropTypes.arrayOf(PropTypes.number).isRequired,
  showStream: PropTypes.bool.isRequired,
  streamFutureUrl: PropTypes.string.isRequired,
};

class NavStream extends Component {
  constructor() {
    super();
    this.interval = null;
    this.onClick = this.onClick.bind(this);
  }

  componentWillMount() {
    this.interval = setInterval(() => {
      const { fetchNewStreamSongs, streamFutureUrl } = this.props;
      if (streamFutureUrl) {
        fetchNewStreamSongs(streamFutureUrl);
      }
    }, 60000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    this.interval = null;
  }

  onClick() {
    const { loadNewStreamSongs, newStreamSongs } = this.props;
    loadNewStreamSongs(newStreamSongs);
  }

  render() {
    const { navigateTo, newStreamSongs, showStream } = this.props;
    const newStreamSongsCount = newStreamSongs.length;

    return (
      <Link
        className={`nav-session__item ${showStream ? 'nav-session__item--active' : ''}`}
        navigateTo={navigateTo}
        onClick={this.onClick}
        options={{ s: 'stream' }}
        path={SONGS_PATH}
      >
        Stream
        {newStreamSongsCount
          ? (
            <div className="nav-session__item__badge">
              <div className="nav-session__item__badge__text">
                {newStreamSongsCount}
              </div>
            </div>
          ) : null}
      </Link>
    );
  }
}

NavStream.propTypes = propTypes;

export default NavStream;
