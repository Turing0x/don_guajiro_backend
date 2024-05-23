import { Router } from "express"

import { DebtsControllers } from '../infraestructure/debts.controllers';

const router = Router()

router

  .get('/', DebtsControllers.getAllDebts)

  .get('/:id', DebtsControllers.getDebtsById)

  .post('/', DebtsControllers.saveDebt)

  .delete('/:id', DebtsControllers.deleteDebt)

export const DebtsRouter = router
