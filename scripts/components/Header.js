import React, {Component, PropTypes} from 'react';
import HeaderSearch from '../components/HeaderSearch';
import Link from '../components/Link';

class Header extends Component {
    render() {
        const {dispatch} = this.props;

        return (
            <div className='header'>
                <div className='container clearfix'>
                    <div className='header-logo'>
                        <i className='icon ion-radio-waves' />
                    </div>
                    <ul className='header-nav float-left'>
                        <li className='header-nav-item'>
                            <Link
                                className='header-nav-item-link active'
                                dispatch={dispatch}
                                path={['songs']}>
                                SoundRedux
                            </Link>
                        </li>
                    </ul>
                    <ul className='header-nav float-right'>
                        <li className='header-nav-item'>
                            <HeaderSearch dispatch={dispatch} />
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
