import { Router } from "express"

import { ProductsControllers } from '../infraestructure/product.controllers';

const router = Router()

router

  .get('/', ProductsControllers.getAllProducts)
  .get('/:id', ProductsControllers.getProductsById)

  .post('/', ProductsControllers.saveProduct)
  // .put('/:wokerId', ProductsControllers.updateUsers)

  .delete('/:id', ProductsControllers.deleteProduct)

export const ProductsRouter = router
