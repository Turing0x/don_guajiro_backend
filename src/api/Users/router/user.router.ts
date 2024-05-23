import { Router } from "express"

import { UsersControllers } from '../infraestructure/user.controllers';

const router = Router()

router

  .get('/', UsersControllers.getAllUsers)
  .get('/:id', UsersControllers.getUsersById)
  // .get('/profile/:reg_med', UsersControllers.getDoctorByRegMed)
  // .get('/:clinicId', UsersControllers.getAllUsersOfAClinic)
  // .get('/byoccupation/:occupation', UsersControllers.getByOccupationUsers)

  .post('/', UsersControllers.saveUser)
  .post('/signIn', UsersControllers.sign)
  // .post('/changePassword', UsersControllers.changePassword)
  .post('/changeActive', UsersControllers.changeActive)
  // .post('/sendMail', UsersControllers.sendMailToRecoveryPass)

  // .put('/:wokerId', UsersControllers.updateUsers)

  .delete('/:id', UsersControllers.deleteUser)

export const UsersRouter = router
