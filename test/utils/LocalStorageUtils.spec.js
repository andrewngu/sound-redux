import expect from 'expect';
import LocalStorageUtils from '../../scripts/utils/LocalStorageUtils';

describe('local storage', () => {
  it('can save key - value', () => {
    LocalStorageUtils.set('volume', 0.5);
    expect(localStorage.getItem('volume')).toEqual('0.5');
  })

  it('can get value by key', () => {
    localStorage.setItem('volume', 0.5);
    expect(LocalStorageUtils.get('volume')).toEqual('0.5');
  });
});
