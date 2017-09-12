import PropTypes from 'prop-types';
import React, { Component } from 'react';

import InfiniteScroll from '../components/InfiniteScroll';
import SongsBody from '../components/SongsBody';
import SongsHeader from '../components/SongsHeader';
import stickyOnScroll from '../components/stickyOnScroll';

const defaultProps = {
  playingSongId: null,
  playlistUrl: null,
  playlistNextUrl: null,
  time: null,
};

const propTypes = {
  fetchSongsIfNeeded: PropTypes.func.isRequired,
  fetchSongsNext: PropTypes.func.isRequired,
  genre: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  height: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  playSong: PropTypes.func.isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlistNextUrl: PropTypes.string,
  playlistUrl: PropTypes.string,
  search: PropTypes.string.isRequired,
  showLikes: PropTypes.bool.isRequired,
  showPlaylist: PropTypes.bool.isRequired,
  showStream: PropTypes.bool.isRequired,
  sticky: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  time: PropTypes.string.isRequired,
  times: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  toggleLike: PropTypes.func.isRequired,
};

class Songs extends Component {
  componentWillMount() {
    const { fetchSongsIfNeeded, playlist, playlistUrl } = this.props;
    fetchSongsIfNeeded(playlist, playlistUrl);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchSongsIfNeeded, playlist } = this.props;
    if (playlist !== nextProps.playlist) {
      fetchSongsIfNeeded(nextProps.playlist, nextProps.playlistUrl);
    }
  }

  render() {
    const {
      fetchSongsNext,
      genre,
      genres,
      height,
      isAuthenticated,
      isFetching,
      isMobile,
      isPlaying,
      navigateTo,
      likes,
      login,
      playingSongId,
      playlist,
      playlistNextUrl,
      playSong,
      search,
      showLikes,
      showPlaylist,
      showStream,
      sticky,
      songs,
      time,
      times,
      toggleLike,
    } = this.props;

    return (
      <InfiniteScroll args={[playlist, playlistNextUrl]} onScroll={fetchSongsNext}>
        <SongsHeader
          genre={genre}
          genres={genres}
          navigateTo={navigateTo}
          search={search}
          showLikes={showLikes}
          showPlaylist={showPlaylist}
          showStream={showStream}
          sticky={sticky}
          time={time}
          times={times}
        />
        <div className="container">
          <SongsBody
            height={height}
            isAuthenticated={isAuthenticated}
            isFetching={isFetching}
            isMobile={isMobile}
            isPlaying={isPlaying}
            likes={likes}
            login={login}
            navigateTo={navigateTo}
            playingSongId={playingSongId}
            playlist={playlist}
            playSong={playSong}
            songs={songs}
            toggleLike={toggleLike}
          />
        </div>
      </InfiniteScroll>
    );
  }
}

Songs.defaultProps = defaultProps;
Songs.propTypes = propTypes;

export default stickyOnScroll(Songs, 50);
