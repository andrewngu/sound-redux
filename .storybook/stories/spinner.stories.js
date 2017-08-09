import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../scripts/components/Spinner';

const baseProps = {};

storiesOf('Spinner', module)
  .add('basic', () => (<Component />));
