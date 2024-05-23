import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { Clasifications } from '../interface/clasifications.interface';
import { ClasificationsModel } from '../models/clasifications.model';

export class ClasificationsControllers {

  static async getAllClasifications (req: Request, res: Response) {

    try {
      const list = await ClasificationsModel.find()
        .populate('concept').lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', list);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getClasificationsById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        500,
        false,
        'Error Grave', ''); 
    
      const user = await ClasificationsModel.findById(clientId);
      if (!user) return sendRes(res, 500, false, 'Clasificación no encontrado', ''); 
      
      return sendRes(res, 500, false, 'Resultado de la búsqueda', user); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 500, false, 'mess_0', '');
      }
    }

  }

  static async saveClasification(req: Request, res: Response) {
  
    try {

      const data: Clasifications = req.body;
      const user = new ClasificationsModel(data);
      
      await user.save();
      return sendRes(res, 200, true, 'Clasificación Creada Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteClasification (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 500, false, 'Clasificación no encontrado', ''); 
    
      await ClasificationsModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Clasificación Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Interno', '');
      }
    }

  }

}