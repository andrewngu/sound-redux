import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';
import {addCommas} from '../utils/FormatUtils';
import {getUserLocation} from '../utils/UserUtils';

class UserCard extends Component {
    render() {
        const {dispatch, user} = this.props;

        return (
            <div className='user-card'>
                <img className='user-card-image' src={user.avatar_url} />
                <div className='user-card-info'>
                    <Link
                        className='user-card-title'
                        dispatch={dispatch}
                        path={['users', user.id]}>
                        {user.username}
                    </Link>
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
