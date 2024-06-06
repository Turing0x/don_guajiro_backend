import { Router } from 'express';

import { OrderControllers } from './infraesctructure/order.controller';

const router = Router()

router

  .get('/', OrderControllers.getAllOrders)
  
  .get('/getById/:orderId', OrderControllers.getOrderById)
  .get('/pending/:date', OrderControllers.getAllRequested)
  .get('/getDaily/:date', OrderControllers.getDailyResume)
  .get('/getByCommOrder/:commercialCode/:date', OrderControllers.getOrdersByCommercial)

  .post('/', OrderControllers.saveOrder)

  .delete('/:orderId', OrderControllers.deleteOrderById)


export const OrderRouter = router

