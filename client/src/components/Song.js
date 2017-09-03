import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { playSong } from '../actions/PlayerActions';

import Comments from '../components/Comments';
import SongListItem from '../components/SongListItem';
import Loader from '../components/Loader';
import SongMain from '../components/SongMain';
import stickify from '../components/Stickify';

import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';

import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';

const defaultProps = {
  playingSongId: null,
};

const propTypes = {
  authed: PropTypes.shape({}).isRequired,
  dispatch: PropTypes.func.isRequired,
  fetchSongIfNeeded: PropTypes.func.isRequired,
  height: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  player: PropTypes.shape({}).isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playlists: PropTypes.shape({}).isRequired,
  song: PropTypes.shape({}).isRequired,
  songs: PropTypes.shape({}).isRequired,
  sticky: PropTypes.bool.isRequired,
  users: PropTypes.shape({}).isRequired,
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

  playSong(i) {
    const { dispatch, songId, songs } = this.props;
    const song = songs[songId];
    if (!song) {
      return;
    }

    dispatch(playSong(song.title + SONG_PLAYLIST_SUFFIX, i));
  }

  renderComments() {
    const { height, player, playingSongId, songId, songs } = this.props;
    const song = songs[songId];
    if (!song || !song.comments) {
      return null;
    }

    return (
      <Comments
        comments={song.comments}
        currentTime={player.currentTime}
        height={height}
        isActive={playingSongId === song.id}
      />
    );
  }

  renderSongs() {
    const { authed, dispatch, player, playingSongId, playlists, songId, songs, users } = this.props;
    const song = songs[songId];
    const playlist = song.title + SONG_PLAYLIST_SUFFIX;
    const relatedSongs = playlist in playlists ? playlists[playlist] : {};
    if (!relatedSongs.items) {
      return null;
    }

    const items = relatedSongs.items.slice(1).map((relatedSongId, i) => {
      const relatedSong = songs[relatedSongId];
      const user = users[relatedSong.user_id];
      const playSongFunc = this.playSong.bind(this, i + 1);
      return (
        <SongListItem
          authed={authed}
          dispatch={dispatch}
          isActive={playingSongId === relatedSong.id}
          key={relatedSong.id}
          player={player}
          playSong={playSongFunc}
          song={relatedSong}
          user={user}
        />
      );
    });

    return (
      <div className="tab-content">
        {items}
      </div>
    );
  }

  renderTogglePlayButton() {
    const { playingSongId, songId } = this.props;
    const isActive = playingSongId && playingSongId === songId;
    const playSongFunc = this.playSong.bind(this, 0);

    if (isActive) {
      return <TogglePlayButtonContainer />;
    }

    return (
      <div className="toggle-play-button" onClick={playSongFunc}>
        <i className="toggle-play-button-icon ion-ios-play" />
      </div>
    );
  }

  render() {
    const { id, playingSongId, player, song, sticky } = this.props;
    if (!song) {
      return <Loader />;
    }

    return (
      <div className="container">
        <div className="content">
          <div className="song__main">
            <SongMain
              isActive={Boolean(playingSongId === id)}
              player={player}
              playSong={playSong}
              song={song}
            />
          </div>
          <div className="song__sidebar" />
        </div>
      </div>
    );
  }
}

Song.defaultProps = defaultProps;
Song.propTypes = propTypes;

export default stickify(Song, 50);
