import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongList from '../components/SongList';
import Loader from '../components/Loader';
import stickyOnScroll from '../components/stickyOnScroll';
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
  isAuthenticated: PropTypes.bool.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  likes: PropTypes.shape({}).isRequired,
  login: PropTypes.func.isRequired,
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
  toggleFollow: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
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
      isAuthenticated,
      isFollowing,
      likes,
      login,
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
      toggleFollow,
      toggleLike,
      user,
    } = this.props;
    if (shouldFetchUser) {
      return <Loader className="loader--full" isLoading />;
    }

    return (
      <div className="container">
        <div className="user content">
          <div className="user__main">
            <UserMain
              isFollowing={isFollowing}
              profiles={profiles}
              toggleFollow={toggleFollow}
              user={user}
            />
            <SongList
              className="user__song-list"
              isAuthenticated={isAuthenticated}
              likes={likes}
              login={login}
              navigateTo={navigateTo}
              player={player}
              playingSongId={playingSongId}
              playlist={playlist}
              playSong={playSong}
              songs={songs}
              toggleLike={toggleLike}
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

export default stickyOnScroll(User, 50);
