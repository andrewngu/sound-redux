import users from '../../../utils/fixtures/users';

export default {
  user: users[10762173],
  dispatch: (action) => console.log('dispatch', action),
};
