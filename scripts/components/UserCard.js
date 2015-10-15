import React, {Component, PropTypes} from 'react';

class UserCard extends Component {
    render() {
        const {user} = this.props;

        return (
            <div className='user-card'>
                <img className='user-card-image' src={user.avatar_url} />
            </div>
        );
    }
}

UserCard.propTypes = {
    user: PropTypes.object.isRequired
};

export default UserCard;
