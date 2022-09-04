const request = require('supertest');
const app = require('../src/app');
const User = require('../src/schemas/user');
const { userOneId, userOne, setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should login existing user', async () => {
  const response = await request(app)
    .post('/login')
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
  await request(app)
    .post('/login')
    .send({
      email: userOne.email,
      password: 'd8932ybdvhjdbj',
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  await request(app)
    .get('/api/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user', async () => {
  await request(app).get('/api/users').send().expect(401);
});

test('Should delete account for user', async () => {
  await request(app)
    .delete('/api/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticate user', async () => {
  await request(app).delete('/api/users').send().expect(401);
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/api/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      name: 'Prajwal',
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Prajwal');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/api/users')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({
      location: 'India',
    })
    .expect(400);
});
