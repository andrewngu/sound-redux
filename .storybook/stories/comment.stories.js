import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/Comment';
import getComment from '../data/comment';

storiesOf('Comment', module)
  .add('basic', () => {
    const props = { comment: getComment(), i: 1 }
    return (
      <Component { ...props }/>
    );
  })
  .add('cool name', () => {
    const props = { comment: getComment({ user: { username: 'Norbert de Langen' }}), i: 1 };
    return (
      <Component { ...props }/>
    );
  });
