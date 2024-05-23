import { Router } from "express"

import { UsersControllers } from '../infraestructure/user.controllers';

const router = Router()

router

  .get('/', UsersControllers.getAllUsers)

  .get('/:id', UsersControllers.getUsersById)

  .post('/', UsersControllers.saveUser)
  .post('/signIn', UsersControllers.sign)

  .post('/changeActive', UsersControllers.changeActive)

  .delete('/:id', UsersControllers.deleteUser)

export const UsersRouter = router
