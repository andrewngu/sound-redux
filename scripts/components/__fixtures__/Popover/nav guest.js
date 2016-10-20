const React = require('react');

export default {
  className: 'nav-user',
  children: [
    <div key="btn" className="nav-user-link">
      <i className="icon ion-person"></i>
      <i className="icon ion-chevron-down"></i>
      <i className="icon ion-chevron-up"></i>
    </div>,
    <div key="menu" className="nav-user-popover popover-content">
      <ul className="nav-user-popover-list">
        <li className="nav-user-popover-item">
          <a href="#" className="button orange block" onClick={() => console.log('sign in')}>
            Sign into SoundCloud
          </a>
        </li>
      </ul>
    </div>,
  ],
};
