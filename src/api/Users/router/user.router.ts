import { Router } from "express"

import { UsersControllers } from '../infraestructure/user.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, UsersControllers.getAllUsers)
  .get('/sellers', checkAuth, UsersControllers.getAllSeller)

  .get('/:id', checkAuth, UsersControllers.getUsersById)

  .post('/', checkAuth, UsersControllers.saveUser)
  .post('/signIn', UsersControllers.sign)

  .post('/changeActive', checkAuth, UsersControllers.changeActive)
  .post('/checkToken/:token', checkAuth, UsersControllers.tokenVerify)

  .delete('/:id', checkAuth, UsersControllers.deleteUser)

export const UsersRouter = router
