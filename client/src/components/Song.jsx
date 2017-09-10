import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongComments from '../components/SongComments';
import SongList from '../components/SongList';
import Loader from '../components/Loader';
import SongMain from '../components/SongMain';
import stickyOnScroll from '../components/stickyOnScroll';

const defaultProps = {
  playingSongId: null,
  song: null,
};

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSongIfNeeded: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  song: PropTypes.shape({}),
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  sticky: PropTypes.bool.isRequired,
  timed: PropTypes.bool.isRequired,
  toggleLike: PropTypes.func.isRequired,
};

class Song extends Component {
  componentWillMount() {
    const { fetchSongIfNeeded, id, playlist } = this.props;
    fetchSongIfNeeded(id, playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchSongIfNeeded, id } = this.props;
    if (nextProps.id !== id) {
      fetchSongIfNeeded(nextProps.id, nextProps.playlist);
    }
  }

  render() {
    const {
      comments,
      id,
      isAuthenticated,
      likes,
      login,
      navigateTo,
      playlist,
      player,
      playingSongId,
      playSong,
      sidebarHeight,
      song,
      songs,
      sticky,
      timed,
      toggleLike,
    } = this.props;
    if (!song) {
      return <Loader className="loader--full" isLoading />;
    }

    return (
      <div className="container">
        <div className="song content">
          <div className="song__main">
            <SongMain
              isActive={playingSongId === id}
              isAuthenticated={isAuthenticated}
              liked={Boolean(id in likes && likes[id])}
              login={login}
              navigateTo={navigateTo}
              player={player}
              playlist={playlist}
              playSong={playSong}
              song={song}
              toggleLike={toggleLike}
            />
            <SongList
              className="song__song-list"
              id={id}
              isAuthenticated={isAuthenticated}
              likes={likes}
              login={login}
              navigateTo={navigateTo}
              offsetIndex={1}
              player={player}
              playingSongId={playingSongId}
              playlist={playlist}
              playSong={playSong}
              songs={songs}
              toggleLike={toggleLike}
            />
          </div>
          <div className="song__sidebar">
            <SongComments
              comments={comments}
              id={id}
              navigateTo={navigateTo}
              sidebarHeight={sidebarHeight}
              sticky={sticky}
              timed={timed}
            />
          </div>
        </div>
      </div>
    );
  }
}

Song.defaultProps = defaultProps;
Song.propTypes = propTypes;

export default stickyOnScroll(Song, 50);
