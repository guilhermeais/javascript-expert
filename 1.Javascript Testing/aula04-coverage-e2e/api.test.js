const { describe, test } = require('mocha');
const assert = require('assert');
const request = require('supertest');
const app = require('./api');
describe('API Suite test', () => {
  describe('/contact', () => {
    test('should request the contact page and return HTTP Status 200', async () => {
      const response = await request(app).get('/contact');
      assert.deepStrictEqual(response.text, 'Contact us page')
    });
  });

  describe('/hello', () => {
    test('should request an inexistent route /hi and redirect to /hello', async () => {
      const response = await request(app).get('/hi');
      assert.deepStrictEqual(response.text, 'Hello World')
    });
  });

  describe('/login', () => {
    test('should login successfully on the login route and return HTTP Status 200', async () => {
      const response = await request(app).post('/login').send({
        username: 'guilherme',
        password: 'some_password'
      });
      assert.deepStrictEqual(response.text, 'Login has succeeded!')
    });

    test('should unathorize a request when requesting it using wrong credentials and return HTTP Status 401', async () => {
      const response = await request(app).post('/login').send({
        username: 'guilherme',
        password: 'some_invalid_password'
      })
      .expect(401);
      assert.deepStrictEqual(response.text, 'Login has failed!')
    });
  });
});