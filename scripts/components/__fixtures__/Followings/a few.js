import users from '../../../utils/fixtures/users';

export default {
  height: 799,
  users: Object.keys(users).map((userId) => users[userId]),
  dispatch: (action) => console.log('dispatch', action),
};
