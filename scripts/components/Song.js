import React, {Component, PropTypes} from 'react';
import CommentCard from '../components/CommentCard';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import {getImageUrl} from '../helpers/SongsHelper';

class Song extends Component {
    renderComments() {
        const {comments} = this.props.song;
        if (!comments) {
            return;
        }

        return comments.slice(0, 10).map(comment => <CommentCard key={comment.id} comment={comment} />);
    }

    renderSongs() {
        const {songs} = this.props;
        if (!songs.items) {
            return;
        }

        return (
            <div className='tab-content'>
                {songs.items.slice(1).map(song => <SongCard key={song.id} song={song} />)}
            </div>
        );
    }

    render() {
        const {song} = this.props;
        if (song.isFetching) {
            return <Spinner />;
        }

        const image = getImageUrl(song.artwork_url);
        const {user} = song;

        return (
            <div className='container'>
                <div className='content'>
                    <div className='grid'>
                        <div className='col-7-10'>
                            <div className='song card'>
                                <div className='song-main'>
                                    <div
                                        className='song-image'
                                        style={{backgroundImage: `url(${image})`}}>
                                    </div>
                                    <div className='song-info'>
                                        <div className='song-title'>{song.title}</div>
                                        <div className='song-user'>
                                            <div
                                                className='song-user-image'
                                                style={{backgroundImage: `url(${user.avatar_url})`}}>
                                            </div>
                                            <div className='song-username'>{user.username}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {this.renderSongs()}
                        </div>
                        <div className='col-3-10'>
                            <div className='card sidebar'>
                                <div className='sidebar-header'>Comments</div>
                                {this.renderComments()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Song.propTypes = {
    song: PropTypes.object.isRequired
};

export default Song;
