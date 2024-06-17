import { Router } from "express"

import { SalesControllers } from '../infraestructure/sales.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/pendingAll/:pending', checkAuth, SalesControllers.getAllSalesPending)

  .get('/', checkAuth, SalesControllers.getAllSales)

  .get('/:id', checkAuth, SalesControllers.getSalesById)
  
  .post('/', checkAuth, SalesControllers.saveSale)
  
  .put('/:id', checkAuth, SalesControllers.markSaleAsFinished)

  .delete('/:id', checkAuth, SalesControllers.deleteSale)

export const SalesRouter = router
