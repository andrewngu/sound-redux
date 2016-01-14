import expect from 'expect';
import Player from '../../scripts/components/Player';

describe('volume', () => {
  it('initial level is 1', () => {
    let player = new Player();
    expect(player.state.volume).toEqual(1);
  });

  it('can restore previous value from local storage', () => {
    localStorage.setItem('volume', 0.65);
    let player = new Player();
    expect(player.state.volume).toEqual(0.65);
  });
});

describe('handleVolumeChange', () => {
  let player = new Player();
  const event = {
    currentTarget: {
      volume: 0.56
    }
  };

  it('saves new value to localStorage', () => {
    player.handleVolumeChange(event);
    expect(localStorage.getItem('volume')).toEqual('0.56');
  });
});
