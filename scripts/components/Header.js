import React, {Component, PropTypes} from 'react';
import {changeModal} from '../actions/modal';
import HeaderSearch from '../components/HeaderSearch';
import Link from '../components/Link';

class Header extends Component {
    constructor(props) {
        super(props);
        this.openLoginModal = this.openLoginModal.bind(this);
    }

    openLoginModal() {
        const {dispatch} = this.props;
        dispatch(changeModal('login'));
    }

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
                                route={{path: ['songs']}}>
                                SoundRedux
                            </Link>
                        </li>
                    </ul>
                    <ul className='header-nav float-right'>
                        <li className='header-nav-item'>
                            <HeaderSearch dispatch={dispatch} />
                        </li>
                        <li className='header-nav-item'>
                            <a className='header-login-link' onClick={this.openLoginModal}>
                                <i className='icon ion-person'></i>
                                <i className='icon ion-chevron-down'></i>
                            </a>
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
