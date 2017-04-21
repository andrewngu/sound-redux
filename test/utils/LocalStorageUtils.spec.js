jest.mock('global', () => ({
  localStorage: {
    removeItem: jest.fn(),
    setItem: jest.fn(),
    getItem: jest.fn(),
  },
}));

import { localStorage } from 'global';
import LocalStorageUtils from '../../scripts/utils/LocalStorageUtils';

describe('local storage', () => {
  it('can save key - value', () => {
    LocalStorageUtils.set('volume', 0.5);
    expect(localStorage.setItem).toHaveBeenCalledWith('volume', 0.5);
  })

  it('can get value by key', () => {
    LocalStorageUtils.get('volume')
    expect(localStorage.getItem).toHaveBeenCalledWith('volume');
  });
});
