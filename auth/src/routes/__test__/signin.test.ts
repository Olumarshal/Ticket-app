import request from 'supertest';
import { app } from '../../app';

it('fails with non existing email', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'alright@test.com',
      password: 'passphrase',
    })
    .expect(400);
});

it('fails with incorrect password', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alright@test.com',
      password: 'passphrase',
    })
    .expect(201);

  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'alright@test.com',
      password: 'passph',
    })
    .expect(400);
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'alright@test.com',
      password: 'passphrase',
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: 'alright@test.com',
      password: 'passphrase',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});
