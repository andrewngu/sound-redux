import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongList from '../components/SongList';
import Loader from '../components/Loader';
import stickify from '../components/Stickify';
import UserFollowings from '../components/UserFollowings';
import UserMain from '../components/UserMain';

const defaultProps = {
  playingSongId: null,
  user: null,
};

const propTypes = {
  fetchUserIfNeeded: PropTypes.func.isRequired,
  followings: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  id: PropTypes.number.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  profiles: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  shouldFetchUser: PropTypes.bool.isRequired,
  sidebarHeight: PropTypes.number.isRequired,
  sticky: PropTypes.bool.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}),
};

class User extends Component {
  componentWillMount() {
    const { fetchUserIfNeeded, id, playlist, shouldFetchUser } = this.props;
    fetchUserIfNeeded(shouldFetchUser, id, playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUserIfNeeded, id } = this.props;
    if (nextProps.id !== id) {
      fetchUserIfNeeded(nextProps.shouldFetchUser, nextProps.id, nextProps.playlist);
    }
  }

  render() {
    const {
      followings,
      navigateTo,
      player,
      playlist,
      playingSongId,
      playSong,
      profiles,
      shouldFetchUser,
      sidebarHeight,
      sticky,
      songs,
      user,
    } = this.props;
    if (shouldFetchUser) {
      return <Loader className="loader--full" isLoading />;
    }

    return (
      <div className="container">
        <div className="user content">
          <div className="user__main">
            <UserMain profiles={profiles} user={user} />
            <SongList
              className="user__song-list"
              navigateTo={navigateTo}
              player={player}
              playingSongId={playingSongId}
              playlist={playlist}
              playSong={playSong}
              songs={songs}
            />
          </div>
          <div className="user__sidebar">
            <UserFollowings
              followings={followings}
              navigateTo={navigateTo}
              sidebarHeight={sidebarHeight}
              sticky={sticky}
            />
          </div>
        </div>
      </div>
    );
  }
}

User.defaultProps = defaultProps;
User.propTypes = propTypes;

export default stickify(User, 50);
