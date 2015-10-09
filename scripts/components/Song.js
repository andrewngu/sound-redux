import React, {Component, PropTypes} from 'react';
import CommentCard from '../components/CommentCard';
import SongCard from '../components/SongCard';
import Spinner from '../components/Spinner';
import Stickify from '../components/Stickify';
import {getImageUrl} from '../helpers/SongsHelper';

class Song extends Component {
    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    renderComments() {
        const {height, song} = this.props;
        const {comments} = song;
        if (!comments) {
            return;
        }

        return (
            <div
                className='song-comments'
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                style={{height: height - 220}}>
                {comments.map(comment => <CommentCard key={comment.id} comment={comment} />)}
            </div>
        );
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
        const {song, sticky} = this.props;
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
                            <div className={'card sidebar' + (sticky ? ' sticky' : '')}>
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

export default Stickify(Song, 50);
