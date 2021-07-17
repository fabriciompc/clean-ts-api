import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return account on sucesss', async () => {
    await request(app)
      .post('/api/signup ')
      .send({
        name: 'Fabricio Cardoso',
        email: 'fabriciompc@outlook.com.br ',
        password: '123456',
        passwordConfirmation: '123456'
      })
      .expect(200)
  })
})
