import React, {Component, PropTypes} from 'react';

class Header extends Component {
    render() {
        return (
            <div className='header'>
                <div className='container'>
                    <div className='header-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <ul className='header-nav'>
                        <li className='header-nav-item'>
                            <a className='header-nav-item-link active'>SoundRedux</a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

Header.propTypes = {

};

export default Header;
