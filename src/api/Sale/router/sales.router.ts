import { Router } from "express"

import { SalesControllers } from '../infraestructure/sales.controllers';

const router = Router()

router

  .get('/pendingAll/:pending', SalesControllers.getAllSalesPending)

  .get('/', SalesControllers.getAllSales)

  .get('/:id', SalesControllers.getSalesById)
  
  .post('/', SalesControllers.saveSale)
  
  .put('/:id', SalesControllers.markSaleAsFinished)

  .delete('/:id', SalesControllers.deleteSale)

export const SalesRouter = router
