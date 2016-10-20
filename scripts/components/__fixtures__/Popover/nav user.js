const React = require('react');

export default {
  className: 'nav-user',
  children: [
    <div key="btn" className="nav-user-link">
      <img
        alt="user avatar"
        className="nav-authed-image"
        src="https://i1.sndcdn.com/avatars-000231202970-bfmt04-large.jpg"
      />
      <i className="icon ion-chevron-down"></i>
      <i className="icon ion-chevron-up"></i>
    </div>,
    <div key="menu" className="nav-user-popover popover-content">
      <ul className="nav-user-popover-list">
        <li className="nav-user-popover-item">
          <a href="#" onClick={() => console.log('log out')}>Log Out</a>
        </li>
      </ul>
    </div>,
  ],
};
