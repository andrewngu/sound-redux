import React, { Component, PropTypes } from 'react';
import { toggleFollow } from '../actions/AuthedActions';
import { playSong } from '../actions/PlayerActions';
import { fetchUserIfNeeded } from '../actions/UsersActions';

import Followings from '../components/Followings';
import SongListItem from '../components/SongListItem';
import Spinner from '../components/Spinner';
import stickify from '../components/Stickify';

import { USER_PLAYLIST_SUFFIX } from '../constants/PlaylistConstants';
import { IMAGE_SIZES } from '../constants/SongConstants';

import { addCommas, getSocialIcon } from '../utils/FormatUtils';
import { getImageUrl } from '../utils/SongUtils';
import { getUserLocation } from '../utils/UserUtils';

const propTypes = {
  authed: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  height: PropTypes.number,
  player: PropTypes.object.isRequired,
  playingSongId: PropTypes.number,
  playlists: PropTypes.object.isRequired,
  songs: PropTypes.object.isRequired,
  sticky: PropTypes.bool.isRequired,
  userId: PropTypes.number,
  users: PropTypes.object.isRequired,
};

class User extends Component {
  constructor() {
    super();
    this.toggleFollow = this.toggleFollow.bind(this);
  }

  componentWillMount() {
    const { dispatch, userId } = this.props;
    dispatch(fetchUserIfNeeded(userId));
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch, userId } = this.props;
    if (nextProps.userId !== userId) {
      dispatch(fetchUserIfNeeded(nextProps.userId));
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
    const { sticky, userId, users } = this.props;
    const user = users[userId];
    if (!user || !user.hasOwnProperty('description')) {
      return <Spinner />;
    }

    const image = user.avatar_url ? getImageUrl(user.avatar_url, IMAGE_SIZES.LARGE) : null;
    return (
      <div className="container">
        <div className="content">
          <div className="grid">
            <div className="col-7-10">
              <div className="user card">
                <div className="user-detail">
                  <img
                    alt="user avatar"
                    className="user-image"
                    src={image}
                  />
                </div>
                <div className="user-info">
                  {this.renderFollowButton()}
                  <div className="user-username">
                    {user.username}
                  </div>
                  <div className="user-location">
                    <i className="icon ion-location" />
                    {getUserLocation(user)}
                  </div>
                  <div className="user-profiles">
                    <div className="user-profile">
                      {`${addCommas(user.followers_count)} followers`}
                    </div>
                    {this.renderUserProfiles()}
                  </div>
                  <div
                    className="user-description"
                    dangerouslySetInnerHTML={{ __html: user.description }}
                  />
                </div>
              </div>
              {this.renderSongs()}
            </div>
            <div className="col-3-10">
              <div className={`sidebar ${(sticky ? 'sticky' : '')}`}>
                {this.renderFollowings()}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

User.propTypes = propTypes;

export default stickify(User, 50);
