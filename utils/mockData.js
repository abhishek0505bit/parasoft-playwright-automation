const { faker } = require('@faker-js/faker');

function generateUserData() {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number(),
    ssn: faker.string.numeric(9),
    username: faker.internet.userName().toLowerCase(),
    password: faker.internet.password(),
  };
}

module.exports = { generateUserData };
