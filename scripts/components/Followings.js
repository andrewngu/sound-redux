import React, {Component, PropTypes} from 'react';
import SidebarContent from '../components/SidebarContent';
import UserCard from '../components/UserCard';

class Followings extends Component {
    renderFollowings() {
        const {users} = this.props;
        return users.map(user => <UserCard key={user.id} user={user} />);
    }

    render() {
        const {height, users} = this.props;

        return (
            <div className='followings'>
                <div className='followings-header'>
                    <div className='followings-title'>Following Users</div>
                    <div className='followings-count'>{users.length}</div>
                </div>
                <SidebarContent height={height - 220}>
                    {this.renderFollowings()}
                </SidebarContent>
            </div>
        );
    }
}

Followings.propTypes = {
    users: PropTypes.array.isRequired
};

export default Followings;
