import React, { Component, PropTypes } from 'react';
import { playSong } from '../actions/PlayerActions';
import { fetchSongIfNeeded } from '../actions/SongsActions';

import Comments from '../components/Comments';
import Link from '../components/Link';
import SongListItem from '../components/SongListItem';
import SongHeartCount from '../components/SongHeartCount';
import Spinner from '../components/Spinner';
import stickify from '../components/Stickify';
import Waveform from '../components/Waveform';

import TogglePlayButtonContainer from '../containers/TogglePlayButtonContainer';

import { SONG_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';

import { addCommas } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';

const propTypes = {
  authed: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  songId: PropTypes.number,
  songs: PropTypes.object.isRequired,
  sticky: PropTypes.bool.isRequired,
  users: PropTypes.object.isRequired,
};

class Song extends Component {
  componentWillMount() {
    const { dispatch, songId } = this.props;
    dispatch(fetchSongIfNeeded(songId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, songId } = this.props;
    if (nextProps.songId !== songId) {
      dispatch(fetchSongIfNeeded(nextProps.songId));
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
    const { authed, dispatch, playingSongId, player, songId, songs, sticky, users } = this.props;
    const song = songs[songId];
    if (!song) {
      return <Spinner />;
    }

    const isActive = Boolean(playingSongId && playingSongId === song.id);
    const image = getImageUrl(song.artwork_url, IMAGE_SIZES.LARGE);
    const playSongFunc = this.playSong.bind(this, 0);
    const user = song.user_id in users ? users[song.user_id] : {};

    return (
      <div className="container">
        <div className="content">
          <div className="grid">
            <div className="col-7-10">
              <div className={`song card ${(isActive ? ' active' : '')}`}>
                <div className="song-main">
                  <div
                    className="song__image"
                    style={{ backgroundImage: `url(${image})` }}
                  >
                    {this.renderTogglePlayButton()}
                  </div>
                  <div className="song__info__wrap">
                    <div className="song__info">
                      <div className="song-title">
                        {song.title}
                      </div>
                      <div className="song-user">
                        <div
                          className="song-user-image"
                          style={{ backgroundImage: `url(${getImageUrl(user.avatar_url)})` }}
                        />
                        <Link
                          className="song-username"
                          dispatch={dispatch}
                          route={{ path: ['users', user.id] }}
                        >
                          {user.username}
                        </Link>
                      </div>
                      <div className="song-stats">
                        <SongHeartCount
                          authed={authed}
                          count={song.likes_count ? song.likes_count : song.favoritings_count}
                          dispatch={dispatch}
                          songId={song.id}
                        />
                        <div className="song-stat">
                          <i className="icon ion-play" />
                          <span>{addCommas(song.playback_count)}</span>
                        </div>
                        <div className="song-stat">
                          <i className="icon ion-chatbubble" />
                          <span>{addCommas(song.comment_count)}</span>
                        </div>
                      </div>
                      <div className="song-description">
                        {song.description}
                      </div>
                    </div>
                  </div>
                  <div className="song-waveform">
                    <Waveform
                      currentTime={player.currentTime}
                      dispatch={dispatch}
                      duration={song.duration}
                      isActive={isActive}
                      playSong={playSongFunc}
                      waveformUrl={song.waveform_url.replace('https', 'http')}
                    />
                  </div>
                </div>
              </div>
              {this.renderSongs()}
            </div>
            <div className="col-3-10">
              <div className={`sidebar ${(sticky ? ' sticky' : '')}`}>
                {this.renderComments()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Song.propTypes = propTypes;

export default stickify(Song, 50);
