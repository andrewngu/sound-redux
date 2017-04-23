import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/Toolbar';

storiesOf('Toolbar', module)
  .add('basic', () => {
    const props = {
      playlist: '',
      dispatch: () => {},
      time: 4,
    };
    return (
      <Component { ...props }/>
    );
  });
