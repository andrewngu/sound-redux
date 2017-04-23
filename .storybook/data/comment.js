import faker from 'faker';
import getUser from './user';

export default  (overrides = {}) => {
  const { user: userOverrides, ...commentOverrides } = overrides;
  const user = getUser(userOverrides);

  const { user_id } = user;
  const id = faker.random.uuid();

  return {
    kind: "comment",
    id,
    created_at: (new Date(faker.date.past())).toJSON(),
    user_id,
    track_id: faker.random.uuid(),
    timestamp: faker.random.number(),
    body: faker.lorem.sentence(),
    uri: `https://api.soundcloud.com/comments/${id}`,
    user,
    ...commentOverrides,
  };
};
