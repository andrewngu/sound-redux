import React, {Component, PropTypes} from 'react';
import Link from '../components/Link';

class Header extends Component {
    render() {
        const {dispatch} = this.props;

        return (
            <div className='header'>
                <div className='container'>
                    <div className='header-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <ul className='header-nav'>
                        <li className='header-nav-item'>
                            <Link
                                className='header-nav-item-link active'
                                dispatch={dispatch}
                                path={['songs']}>
                                SoundRedux
                            </Link>
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
