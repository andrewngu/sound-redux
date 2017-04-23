import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Component from '../../client/components/Waveform';

const getWaveform = (overrides) => ({
  currentTime: 0,
  duration: 107138,
  isActive: true,
  waveformUrl: "http://w1.sndcdn.com/LWk2gOnGMdDf_m.png",
  ...overrides,
})

storiesOf('Waveform', module)
  .add('at 0', () => {
    const props = getWaveform();
    return (
      <Component { ...props }/>
    );
  })
  .add('at 25', () => {
    const props = getWaveform({
      currentTime: 25,
    });
    return (
      <Component { ...props }/>
    );
  })
  .add('at 50', () => {
    const props = getWaveform({
      currentTime: 50,
    });
    return (
      <Component { ...props }/>
    );
  });
