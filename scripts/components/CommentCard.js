import React, {Component, PropTypes} from 'react';
import {formatSeconds} from '../helpers/Formatter';
import {getImageUrl} from '../helpers/SongsHelper';

class CommentCard extends Component {
    render() {
        const {comment} = this.props;
        const {user} = comment;
        const image =  getImageUrl(user.avatar_url);

        return (
            <div className='comment-card'>
                <div
                    className='comment-card-image'
                    style={{backgroundImage: `url(${image})`}}>
                </div>
                <div className='comment-card-info'>
                    <div className='comment-card-comment'>
                        {comment.body}
                    </div>
                    <div className='comment-card-username'>
                        {user.username}
                    </div>
                </div>
                <div className='comment-card-time'>
                    {formatSeconds(Math.floor(comment.timestamp/1000))}
                </div>
            </div>
        );
    }
}

CommentCard.propTypes = {
    comment: PropTypes.object.isRequired
};

export default CommentCard;
