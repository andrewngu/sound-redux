import React, {Component, PropTypes} from 'react';
import {playSong} from '../actions/player';
import SongCard from '../components/SongCard';
import {getImageUrl} from '../helpers/SongsHelper';

class User extends Component {
    playSong(i) {
        const {dispatch, user} = this.props;
        dispatch(playSong(user.username, i));
    }

    renderLocation() {
        const {user} = this.props;

        if (user.city && user.country) {
            return `${user.city}, ${user.country}`;
        } else if (user.city) {
            return user.city;
        } else if (user.country) {
            return user.country;
        }

        return 'Earth';
    }

    renderSongs() {
        const {dispatch, player, playingSong, songs} = this.props;
        if (!songs.items) {
            return;
        }

        const items = songs.items.map((song, i) => {
            return (
                <SongCard
                    dispatch={dispatch}
                    isActive={playingSong.id === song.id}
                    key={song.id}
                    player={player}
                    playSong={this.playSong.bind(this, i)}
                    song={song} />
            );
        });

        return (
            <div className='tab-content'>
                {items}
            </div>
        );
    }

    render() {
        const {user} = this.props;
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
                                        {this.renderLocation()}
                                    </div>
                                    <div className='user-description' dangerouslySetInnerHTML={{__html: user.description}}>
                                    </div>
                                </div>
                            </div>
                            {this.renderSongs()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired
};

export default User;
