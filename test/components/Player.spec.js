jest.mock('global', () => ({
  localStorage: {
    removeItem: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}));

import { localStorage } from 'global';
import Player from '../../scripts/components/Player';

describe('volume', () => {
  it('initial level is 1', () => {
    let player = new Player();
    expect(player.state.volume).toEqual(1);
  });

  it('can restore previous value from local storage', () => {
    localStorage.getItem.mockReturnValue(0.65)
    let player = new Player();
    expect(player.state.volume).toEqual(0.65);
  });
});

describe('handleVolumeChange', () => {
  it('saves new value to localStorage', () => {
    const player = new Player();
    player.handleVolumeChange({
      currentTarget: {
        volume: 0.56
      }
    });
    expect(localStorage.setItem).toHaveBeenCalledWith('volume', 0.56);
  });
});
