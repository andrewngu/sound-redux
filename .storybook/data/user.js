import faker from 'faker';

export default  ({ id, name, ...userOverrides} = {}) => {
  const user_id = id || faker.random.uuid();
  const username = name || faker.internet.userName();
  return {
    id: user_id,
    kind: "user",
    permalink: username,
    username,
    uri: `https://api.soundcloud.com/users/${user_id}`,
    permalink_url: `http://soundcloud.com/${username}`,
    avatar_url: faker.image.avatar(),
    ...userOverrides,
  };
};
