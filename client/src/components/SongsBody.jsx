/* global window */

import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Loader from '../components/Loader';
import SongsBodyRendered from '../components/SongsBodyRendered';
import scrollState from '../utils/ScrollUtils';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  height: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleLike: PropTypes.func.isRequired,
};

class SongBody extends Component {
  constructor(props) {
    super(props);
    this.onScroll = this.onScroll.bind(this);

    this.state = scrollState(props.height, props.songs.length, props.isMobile);
  }

  componentDidMount() {
    window.addEventListener('scroll', this.onScroll, false);
  }

  componentWillReceiveProps(nextProps) {
    const { height, songs } = this.props;
    if (height !== nextProps.height || songs.length !== nextProps.songs.length) {
      this.setState(scrollState(nextProps.height, nextProps.songs.length, nextProps.isMobile));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll, false);
  }

  onScroll() {
    const { height, isMobile, songs } = this.props;
    this.setState(scrollState(height, songs.length, isMobile));
  }

  render() {
    const {
      isAuthenticated,
      isFetching,
      isMobile,
      isPlaying,
      likes,
      login,
      navigateTo,
      playingSongId,
      playlist,
      playSong,
      songs,
      toggleLike,
    } = this.props;
    const { end, paddingBottom, paddingTop, start } = this.state;

    return (
      <div className="songs-body">
        <div className="songs-body__padder" style={{ height: `${paddingTop}px` }} />
        <SongsBodyRendered
          end={end}
          isAuthenticated={isAuthenticated}
          isMobile={isMobile}
          isPlaying={isPlaying}
          likes={likes}
          login={login}
          navigateTo={navigateTo}
          playingSongId={playingSongId}
          playlist={playlist}
          playSong={playSong}
          songs={songs}
          start={start}
          toggleLike={toggleLike}
        />
        <div className="songs-body__padder" style={{ height: `${paddingBottom}px` }} />
        <Loader className="loader--full" isLoading={isFetching} />
      </div>
    );
  }
}

SongBody.defaultProps = defaultProps;
SongBody.propTypes = propTypes;

export default SongBody;
