import { Router } from "express"

import { ConceptsControllers } from "../infraestructure/concepts.controllers"

const router = Router()

router
  .get('/', ConceptsControllers.getAllConcepts)
  .post('/', ConceptsControllers.saveConcept)
  .delete('/:id', ConceptsControllers.deleteConcept)

export const ConceptsRouter = router
