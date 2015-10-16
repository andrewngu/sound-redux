import React, {Component, PropTypes} from 'react';
import {addCommas} from '../helpers/Formatter';
import {getUserLocation} from '../helpers/UsersHelper';

class UserCard extends Component {
    render() {
        const {user} = this.props;

        return (
            <div className='user-card'>
                <img className='user-card-image' src={user.avatar_url} />
                <div className='user-card-info'>
                    <div className='user-card-title'>
                        {user.username}
                    </div>
                    <div className='user-card-subtitle'>
                        <i className='icon ion-location'></i>
                        {getUserLocation(user)}
                    </div>
                </div>
                <div className='user-card-followers'>
                    <div className='user-card-followers-count'>
                        {addCommas(user.followers_count)}
                    </div>
                    <div className='user-card-subtitle'>Followers</div>
                </div>
            </div>
        );
    }
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
