import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/Comments';
import getComment from '../data/comment';

storiesOf('Comments', module)
  .add('short', () => {
    const props = {
      comments: [getComment(), getComment(), getComment(), getComment()],
      height: 500,
      isActive: true,
    };
    return (
      <Component { ...props }/>
    );
  })
  .add('long', () => {
    const props = {
      comments: Array(30).fill({}).map(getComment),
      height: 500,
      isActive: true,
    };
    return (
      <Component { ...props }/>
    );
  })
  .add('single', () => {
    const props = {
      comments: [getComment()],
      height: 500,
      isActive: false,
    };
    return (
      <Component { ...props }/>
    );
  });
