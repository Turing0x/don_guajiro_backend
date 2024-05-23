import { Router } from "express"

import { MeasureControllers } from "../infraestructure/measure.controllers"

const router = Router()

router
  .get('/', MeasureControllers.getAllMeasure)
  .post('/', MeasureControllers.saveMeasure)
  .delete('/:id', MeasureControllers.deleteConcept)

export const MeasuresRouter = router
