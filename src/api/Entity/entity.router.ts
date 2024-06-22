import { Router } from 'express';

import { EntityControllers } from './infraesctructure/entity.controller';
import { checkAuth } from '../../helpers/checkAuth';

const router = Router()

router

  .get('/', checkAuth, EntityControllers.getAllEntities)
  
  .post('/', checkAuth, EntityControllers.saveEntity)

export const EntityRouter = router

