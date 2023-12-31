import { Router } from 'express'

import { type UseCases } from '../../interface/use-cases'
import { UserController } from '../controller/user.controller'

export function getUserRouter(useCases: UseCases): Router {
  const router = Router()

  const userController = new UserController(useCases.createNewUser, useCases.userLogin)

  router.post('/users', userController.create.bind(userController))

  router.post('/users/login', userController.login.bind(userController))

  return router
}
