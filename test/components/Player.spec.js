jest.mock('global', () => ({
  localStorage: {
    removeItem: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}));

const basicProps =  {
  dispatch: () => {},
  player: {},
  playingSongId: 1,
  playlists: {},
  songs: { 1: { user_id: 1, title: '' } },
  users: { 1: { username: ''} },
};

import React from 'React';
import { localStorage } from 'global';
import Player from '../../client/components/Player';
import { mount } from 'enzyme';

describe('volume', () => {
  it('initial level is 1', () => {
    const props = { ...basicProps }
    const player = mount(<Player {...props} />);
    expect(player.state('volume')).toEqual(1);
  });

  it('can restore previous value from local storage', () => {
    localStorage.getItem.mockReturnValue(0.65)
    const props = { ...basicProps }
    const player = mount(<Player {...props} />);
    expect(player.state('volume')).toEqual(0.65);
  });
});

describe('handleVolumeChange', () => {
  it('saves new value to localStorage', () => {
    const props = { ...basicProps }
    const player = mount(<Player {...props} />);
    expect(player.instance().handleVolumeChange({
      currentTarget: {
        volume: 0.56
      }
    }));
    expect(localStorage.setItem).toHaveBeenCalledWith('volume', 0.56);
  });
});
