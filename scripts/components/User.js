import React, {Component, PropTypes} from 'react';
import {playSong} from '../actions/player';
import {fetchUserIfNeeded} from '../actions/users';

import Followings from '../components/Followings';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';

import {USER_PLAYLIST_SUFFIX} from '../constants/PlaylistConstants';

import {addCommas, getSocialIcon} from '../utils/FormatUtils';
import {getImageUrl} from '../utils/SongUtils';
import {getUserLocation} from '../utils/UserUtils';

class User extends Component {
    componentWillMount() {
        const {dispatch, userId} = this.props;
        dispatch(fetchUserIfNeeded(userId));
    }

    componentWillReceiveProps(nextProps) {
        const {dispatch, userId} = this.props;
        if (nextProps.userId !== userId) {
            dispatch(fetchUserIfNeeded(nextProps.userId));
        }
    }

    playSong(i) {
        const {dispatch, userId, users} = this.props;
        const user = users[userId];
        if (!user) {
            return;
        }

        dispatch(playSong(user.username + USER_PLAYLIST_SUFFIX, i));
    }

    renderFollowings() {
        const {dispatch, height, userId, users} = this.props;
        const user = users[userId];
        if (!user || !user.followings) {
            return;
        }

        const followings = user.followings.map(followingId => users[followingId]);
        return <Followings dispatch={dispatch} height={height} users={followings} />;
    }

    renderSongs() {
        const {dispatch, player, playingSongId, playlists, songs, userId, users} = this.props;
        const user = users[userId];
        const playlist = user.username + USER_PLAYLIST_SUFFIX;
        const userSongs = playlist in playlists ? playlists[playlist] : {}
        if (!userSongs.items) {
            return;
        }

        const items = userSongs.items.map((songId, i) => {
            const song = songs[songId];
            const user = users[song.user_id];
            return (
                <SongCard
                    dispatch={dispatch}
                    isActive={playingSongId === song.id}
                    key={song.id + '-' + i}
                    player={player}
                    playSong={this.playSong.bind(this, i)}
                    song={song}
                    user={user} />
            );
        });

        return (
            <div className='tab-content'>
                {items}
            </div>
        );
    }

    renderUserProfiles() {
        const {userId, users} = this.props;
        const user = users[userId];
        if (!user || !user.profiles) {
            return;
        }

        return user.profiles.slice(0,6).map(profile => {
            return (
                <div className='user-profile' key={profile.id}>
                    <i className={'icon ' + getSocialIcon(profile.service)}></i>
                    <a href={profile.url} target='_blank'>{profile.title ? profile.title : profile.service}</a>
                </div>
            );
        });
    }

    render() {
        const {sticky, userId, users} = this.props;
        const user = users[userId];
        if (!user || !user.hasOwnProperty('description')) {
            return <Spinner />;
        }

        const image = user.avatar_url ? getImageUrl(user.avatar_url) : null;
        return (
            <div className='container'>
                <div className='content'>
                    <div className='grid'>
                        <div className='col-7-10'>
                            <div className='user card'>
                                <div className='user-detail'>
                                    <img className='user-image' src={image} />
                                </div>
                                <div className='user-info'>
                                    <div className='user-username'>{user.username}</div>
                                    <div className='user-location'>
                                        <i className='icon ion-location'></i>
                                        {getUserLocation(user)}
                                    </div>
                                    <div className='user-profiles'>
                                        <div className='user-profile'>{addCommas(user.followers_count) + ' followers'}</div>
                                        {this.renderUserProfiles()}
                                    </div>
                                    <div className='user-description' dangerouslySetInnerHTML={{__html: user.description}}></div>
                                </div>
                            </div>
                            {this.renderSongs()}
                        </div>
                        <div className='col-3-10'>
                            <div className={'sidebar' + (sticky ? ' sticky' : '')}>
                                {this.renderFollowings()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

User.propTypes = {
};

export default Stickify(User, 50);
