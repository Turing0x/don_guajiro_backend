import { Router } from "express"

import { ClasificationsControllers } from '../infraestructure/clasifications.controllers';

const router = Router()

router
  .get('/', ClasificationsControllers.getAllClasifications)
  .post('/', ClasificationsControllers.saveClasification)
  .delete('/:id', ClasificationsControllers.deleteClasification)

export const ClasificationsRouter = router
