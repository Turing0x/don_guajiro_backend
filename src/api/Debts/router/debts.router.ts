import { Router } from "express"

import { DebtsControllers } from '../infraestructure/debts.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, DebtsControllers.getAllDebts)

  .get('/:id', checkAuth, DebtsControllers.getDebtsById)

  .post('/', checkAuth, DebtsControllers.saveDebt)

  .delete('/:id', checkAuth, DebtsControllers.deleteDebt)

export const DebtsRouter = router
