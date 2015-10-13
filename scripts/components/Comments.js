import React, {Component, PropTypes} from 'react';
import Comment from '../components/Comment';
import Switch from '../components/Switch';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.toggleTimedComments = this.toggleTimedComments.bind(this);
        this.state = {
            timedComments: false
        };
    }

    handleMouseEnter() {
        document.body.style.overflow = 'hidden';
    }

    handleMouseLeave() {
        document.body.style.overflow = 'auto';
    }

    toggleTimedComments() {
        this.setState({
            timedComments: !this.state.timedComments
        });
    }

    render() {
        const {comments, height} = this.props;
        const {timedComments} = this.state;

        return (
            <div className='comments'>
                <div className='comments-header'>
                    <div className='comments-header-title'>Comments</div>
                    <Switch isOn={timedComments} toggleFunc={this.toggleTimedComments}  />
                </div>
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
