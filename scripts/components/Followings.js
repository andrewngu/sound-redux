import React, {Component, PropTypes} from 'react';

class Followings extends Component {
    renderFollowings() {
        const {users} = this.props;
        return users.map(user => <Following user={user} />);
    }

    render() {
        const {height} = this.props;

        return (
            <div className='followings'>
                <div className='followings-header'>
                    <div className='followings-header-title'>Following Users</div>
                </div>
                <div
                    className='followings-body'
                    onMouseEnter={this.handleMouseEnter}
                    onMouseLeave={this.handleMouseLeave}
                    style={{maxHeight: height - 220}}>
                    {this.renderFollowings()}
                </div>
            </div>
        );
    }
}
