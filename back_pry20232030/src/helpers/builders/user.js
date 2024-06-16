const buildUser = userData => ({
  id: userData.id,
  email: userData.email,
  firstName: userData.firstName,
  lastName: userData.lastName,
  password: userData.password,
});

module.exports = { buildUser };
