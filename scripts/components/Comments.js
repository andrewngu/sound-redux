import React, {Component, PropTypes} from 'react';
import Comment from '../components/Comment';

class Comments extends Component {
    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    render() {
        const {comments, height} = this.props;

        return (
            <div className='comments'>
                <div className='comments-header'>Comments</div>
                <div
                    className='comments-body'
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={{height: height - 220}}>
                    {comments.map(comment => <Comment key={comment.id} comment={comment} />)}
                </div>
            </div>
        )
    }
}

export default Comments;
