import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongComments from '../components/SongComments';
import Loader from '../components/Loader';
import SongMain from '../components/SongMain';
import stickify from '../components/Stickify';

const defaultProps = {
  playingSongId: null,
  song: null,
};

const propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  fetchSongIfNeeded: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  song: PropTypes.shape({}),
  sticky: PropTypes.bool.isRequired,
  timed: PropTypes.bool.isRequired,
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
      isActive,
      navigateTo,
      playlist,
      player,
      playSong,
      sidebarHeight,
      song,
      sticky,
      timed,
    } = this.props;
    if (!song) {
      return <Loader className="loader--full" isLoading />;
    }

    return (
      <div className="container">
        <div className="song content">
          <div className="song__main">
            <SongMain
              isActive={isActive}
              navigateTo={navigateTo}
              player={player}
              playlist={playlist}
              playSong={playSong}
              song={song}
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

export default stickify(Song, 50);
