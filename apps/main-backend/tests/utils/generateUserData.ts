import faker from '@faker-js/faker';

export const generateUserData = () => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    username: faker.internet.userName()
  };
};
