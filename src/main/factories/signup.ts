import { SignUpController } from '../../presentation/controller/signup/signup'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators/log'
import { DbAddAccount } from './../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from './../../infrastructure/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from './../../infrastructure/db/mongodb/account-repository/account'
import { EmailValidatorAdapter } from './../../presentation/utils/email-validator-adapter'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bCryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bCryptAdapter, accountMongoRepository)
  const signupController = new SignUpController(
    emailValidatorAdapter,
    dbAddAccount
  )
  return new LogControllerDecorator(signupController)
}
