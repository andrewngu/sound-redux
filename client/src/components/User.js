import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { toggleFollow } from '../actions/AuthedActions';
import { playSong } from '../actions/PlayerActions';

import Followings from '../components/Followings';
import SongListItem from '../components/SongListItem';
import Loader from '../components/Loader';
import stickify from '../components/Stickify';
import UserMain from '../components/UserMain';

import { USER_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';

import { addCommas, getSocialIcon } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { getUserLocation } from '../utils/UserUtils';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  fetchUserIfNeeded: PropTypes.func.isRequired,
  height: PropTypes.number,
  id: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  sticky: PropTypes.bool.isRequired,
  user: PropTypes.shape({}).isRequired,
  userId: PropTypes.number,
  users: PropTypes.object.isRequired,
};

class User extends Component {
  componentWillMount() {
    const { fetchUserIfNeeded, id } = this.props;
    fetchUserIfNeeded(id);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUserIfNeeded, id } = this.props;
    if (nextProps.id !== id) {
      fetchUserIfNeeded(nextProps.id);
    }
  }

  playSong(i) {
    const { dispatch, userId, users } = this.props;
    const user = users[userId];
    if (!user) {
      return;
    }

    dispatch(playSong(user.username + USER_PLAYLIST_SUFFIX, i));
  }

  toggleFollow() {
    const { dispatch, userId } = this.props;
    dispatch(toggleFollow(userId));
  }

  renderFollowButton() {
    const { authed, userId } = this.props;
    if (!authed.user) {
      return null;
    }

    const isFollowing = userId in authed.followings && authed.followings[userId] === 1;
    return (
      <a
        className={`user-follow-button button red-white small ${(isFollowing ? 'active' : '')}`}
        onClick={this.toggleFollow}
      >
        {isFollowing ? 'following' : 'follow'}
      </a>
    );
  }

  renderFollowings() {
    const { dispatch, height, userId, users } = this.props;
    const user = users[userId];
    if (!user || !user.followings) {
      return null;
    }

    const followings = user.followings.map(followingId => users[followingId]);
    return <Followings dispatch={dispatch} height={height} users={followings} />;
  }

  renderSongs() {
    const { authed, dispatch, player, playingSongId, playlists, songs, userId, users } = this.props;
    const user = users[userId];
    const playlist = user.username + USER_PLAYLIST_SUFFIX;
    const userSongs = playlist in playlists ? playlists[playlist] : {};
    if (!userSongs.items) {
      return null;
    }

    const items = userSongs.items.map((songId, i) => {
      const playSongFunc = this.playSong.bind(this, i);
      const song = songs[songId];
      const songUser = users[song.user_id];
      return (
        <SongListItem
          authed={authed}
          dispatch={dispatch}
          isActive={playingSongId === song.id}
          key={`${song.id}-${i}`}
          player={player}
          playSong={playSongFunc}
          song={song}
          user={songUser}
        />
      );
    });

    return (
      <div className="tab-content">
        {items}
      </div>
    );
  }

  renderUserProfiles() {
    const { userId, users } = this.props;
    const user = users[userId];
    if (!user || !user.profiles) {
      return null;
    }

    return user.profiles.slice(0, 6).map(profile =>
      <div className="user-profile" key={profile.id}>
        <i className={`icon ${getSocialIcon(profile.service)}`} />
        <a href={profile.url} target="_blank">
          {profile.title ? profile.title : profile.service}
        </a>
      </div>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <Loader
        className="loader--full"
        isLoading={!user || !('followings' in user) || !('profiles' in user)}
      >
        <div className="container">
          <div className="user content">
            <div className="user__main">
              <UserMain
                user={user}
              />
            </div>
          </div>
        </div>
      </Loader>
    );
  }
}

User.propTypes = propTypes;

export default stickify(User, 50);
