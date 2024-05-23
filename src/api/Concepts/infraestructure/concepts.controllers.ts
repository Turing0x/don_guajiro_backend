import { Response, Request } from 'express';
import bcrypt from 'bcrypt';

import { sendRes } from '../../../helpers/send.res';
import { Concept } from '../interface/concepts.interface';
import { ConceptsModel } from '../models/concepts.model';

export class ConceptsControllers {

  static async getAllConcepts (req: Request, res: Response) {

    try {
      const users = await ConceptsModel.find().lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', users);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getConceptsById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        500,
        false,
        'Error Grave', ''); 
    
      const user = await ConceptsModel.findById(clientId);
      if (!user) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 500, false, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveConcept(req: Request, res: Response) {
  
    try {

      const data: Concept = req.body;
      const user = new ConceptsModel(data);
      
      await user.save();
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteConcept (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
    
      await ConceptsModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
      }
    }

  }

}