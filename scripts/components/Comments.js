import React, {Component, PropTypes} from 'react';
import Comment from '../components/Comment';
import Switch from '../components/Switch';

const COMMENTS_REFRESH_RATE = 10;

class Comments extends Component {
    constructor(props) {
        super(props);
        this.toggleTimedComments = this.toggleTimedComments.bind(this);
        this.state = {
            currentTime: 0,
            timedComments: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentTime % COMMENTS_REFRESH_RATE === 0) {
            this.setState({
                currentTime: nextProps.currentTime
            });
        }
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

    renderComments() {
        const {currentTime, timedComments} = this.state;
        const {comments} = this.props;

        if (timedComments) {
            return comments
                .slice()
                .filter(song => {
                    const songTime = song.timestamp / 1000;
                    return songTime >= currentTime && songTime < (currentTime + COMMENTS_REFRESH_RATE);
                })
                .sort((a, b) => a.timestamp - b.timestamp)
                .map(comment => {
                    return <Comment key={comment.id} comment={comment} />;
                });
        }

        return comments.slice().sort((a, b) => a.timestamp - b.timestamp).map(comment => {
            return <Comment key={comment.id} comment={comment} />;
        });
    }

    render() {
        const {height} = this.props;
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
                    {this.renderComments()}
                </div>
            </div>
        )
    }
}

export default Comments;
