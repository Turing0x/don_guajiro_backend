import { Response, Request } from 'express';

import { EntityModel } from '../domain/entity.models';
import { sendRes } from '../../../helpers/send.res';
import { Entity } from '../models/entity.model';

async function getAllEntities(req: Request, res: Response) {
  try {
    const entity = await EntityModel.find();
    return sendRes(res, 200, true, 'Resultado de la búsqueda', entity);
  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
  }
}

async function saveEntity(req: Request, res: Response) {
  
  try {
    
    const order: Entity = req.body;
    const entity = new EntityModel(order);

    await entity.save();
    return sendRes(res, 200, true, 'Entidad registrada', '');
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

export const EntityControllers = {
  getAllEntities,
  saveEntity
}