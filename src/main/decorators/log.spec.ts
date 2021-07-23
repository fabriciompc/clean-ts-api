import { Controller } from '../../presentation/protocols'
import { HttpRequest, HttpResponse } from './../../presentation/protocols/http'
import { LogControllerDecorator } from './log'
interface SutTypes {
  sut: LogControllerDecorator
  controllerStub: Controller
}
const makeSut = (): SutTypes => {
  const controllerStub = makeController()
  const sut = new LogControllerDecorator(controllerStub)
  return {
    sut,
    controllerStub
  }
}

const makeController = (): Controller => {
  class ControllerStub implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {
          name: 'Fabricio',
          email: 'fabricio@email.com'
        }
      }
      return new Promise((resolve) => resolve(httpResponse))
    }
  }
  return new ControllerStub()
}
describe('LogController Decorator', () => {
  test('Should Call controller handle ', async () => {
    const { sut, controllerStub } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com',
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    }
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
