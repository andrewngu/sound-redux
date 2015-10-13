import React, {Component, PropTypes} from 'react';
import {formatSeconds} from '../helpers/Formatter';
import {getImageUrl} from '../helpers/SongsHelper';

class Comment extends Component {
    render() {
        const {comment} = this.props;
        const {user} = comment;
        const image =  getImageUrl(user.avatar_url);

        return (
            <div className='comment'>
                <div
                    className='comment-image'
                    style={{backgroundImage: `url(${image})`}}>
                </div>
                <div className='comment-info'>
                    <div className='comment-comment'>
                        {comment.body}
                    </div>
                    <div className='comment-username'>
                        {user.username}
                    </div>
                </div>
                <div className='comment-time'>
                    {formatSeconds(Math.floor(comment.timestamp/1000))}
                </div>
            </div>
        );
    }
}

Comment.propTypes = {
    comment: PropTypes.object.isRequired
};

export default Comment;
