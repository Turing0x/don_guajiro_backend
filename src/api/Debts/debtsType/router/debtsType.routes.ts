import { Router } from "express"
import { DebtsTypeControllers } from "../infraestructure/debtsType.controllers"

const router = Router()

router
  
  .get('/' , DebtsTypeControllers.getAllDebtsType)

  .post('/', DebtsTypeControllers.SaveDebtsType)

  .delete('/:id', DebtsTypeControllers.deleteDebtsType)

export const DebtsTypeRouter = router
