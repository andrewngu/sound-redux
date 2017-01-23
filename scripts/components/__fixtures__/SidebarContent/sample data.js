const React = require('react');

const children = [];
for (let i = 0; i < 20; i++) {
  children.push(<p key={i}>They see me scrolling...</p>);
}

export default {
  height: 200,
  children,
};
