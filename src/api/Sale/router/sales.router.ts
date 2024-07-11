import { Router } from "express"

import { SalesControllers } from '../infraestructure/sales.controllers';
import { checkAuth } from "../../../helpers/checkAuth";

const router = Router()

router

  .get('/', checkAuth, SalesControllers.getAllSales)
  .get('/range', checkAuth, SalesControllers.getSalesByRange)

  .get('/:id', checkAuth, SalesControllers.getSalesById)
  
  .post('/', checkAuth, SalesControllers.saveSale)
  
  .delete('/:id', checkAuth, SalesControllers.deleteSale)

export const SalesRouter = router
