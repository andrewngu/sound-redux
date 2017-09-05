import PropTypes from 'prop-types';
import React, { Component } from 'react';

import SongList from '../components/SongList';
import Loader from '../components/Loader';
import stickify from '../components/Stickify';
import UserMain from '../components/UserMain';

const defaultProps = {
  playingSongId: null,
  user: null,
};

const propTypes = {
  fetchUserIfNeeded: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  navigateTo: PropTypes.func.isRequired,
  player: PropTypes.shape({}).isRequired,
  playingSongId: PropTypes.number,
  playlist: PropTypes.string.isRequired,
  playSong: PropTypes.func.isRequired,
  songs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  user: PropTypes.shape({}),
};

class User extends Component {
  componentWillMount() {
    const { fetchUserIfNeeded, id, playlist } = this.props;
    fetchUserIfNeeded(id, playlist);
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUserIfNeeded, id } = this.props;
    if (nextProps.id !== id) {
      fetchUserIfNeeded(nextProps.id);
    }
  }

  render() {
    const { navigateTo, player, playlist, playingSongId, playSong, songs, user } = this.props;
    if (!user || !('followings' in user) || !('profiles' in user)) {
      return <Loader className="loader--full" isLoading />;
    }

    return (
      <div className="container">
        <div className="user content">
          <div className="user__main">
            <UserMain user={user} />
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
        </div>
      </div>
    );
  }
}

User.defaultProps = defaultProps;
User.propTypes = propTypes;

export default stickify(User, 50);
