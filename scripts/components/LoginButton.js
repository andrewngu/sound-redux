import React, {Component, PropTypes} from 'react';
import {loginUser} from '../actions/authed';

class LoginButton extends Component {
  login(e) {
    e.preventDefault();
    const {dispatch} = this.props;
    dispatch(loginUser(false));
  }

  render() {
    return (
      <div className='login-button'>
        <a className='button orange block' onClick={this.login}>Sign into SoundCloud</a>
      </div>
    );
  }
}

export default LoginButton;
