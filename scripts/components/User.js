import React, {Component, PropTypes} from 'react';
import {getImageUrl} from '../helpers/SongsHelper';

class User extends Component {
    render() {
        const {user} = this.props;
        const image = getImageUrl(user.avatar_url);
        return (
            <div className='container'>
                <div className='content'>
                    <div className='grid'>
                        <div className='col-7-10'>
                            <div className='user card'>
                                <div className='user-detail'>
                                    <img className='user-image' src={image} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

User.propTypes = {
    user: PropTypes.object.isRequired
};

export default User;
