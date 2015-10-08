import React, {Component, PropTypes} from 'react';
import CommentCard from '../components/CommentCard';
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

    render() {
        const {song} = this.props;
        if (song.isFetching) {
            return <Spinner />;
        }

        const image = getImageUrl(song.artwork_url);
        const {user} = song;

        return (
            <div className='container song'>
                <div className='content'>
                    <div className='song grid'>
                        <div className='col-7-10'>
                            <div className='song-card card'>
                                <div className='song-card-main'>
                                    <div
                                        className='song-card-image'
                                        style={{backgroundImage: `url(${image})`}}>
                                    </div>
                                    <div className='song-card-info'>
                                        <div className='song-card-title'>{song.title}</div>
                                        <div className='song-card-user'>
                                            <div
                                                className='song-card-user-image'
                                                style={{backgroundImage: `url(${user.avatar_url})`}}>
                                            </div>
                                            <div className='song-card-username'>{user.username}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
