import React, {Component, PropTypes} from 'react';

class MobileNav extends Component {
    render() {
        const {playlist} = this.props;

        return (
            <div className='mobile-nav'>
                <div className='mobile-nav-item'>
                    {'Hello'}
                </div>
            </div>
        );
    }
}

export default MobileNav;
