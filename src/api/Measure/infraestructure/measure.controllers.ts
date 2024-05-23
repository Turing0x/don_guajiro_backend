import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { Measure } from '../interface/measure.interface';
import { MeasuresModel } from '../models/measure.model';

export class MeasureControllers {

  static async getAllMeasure (req: Request, res: Response) {

    try {
      const measure = await MeasuresModel.find().lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', measure);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getMeasureById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        500,
        false,
        'Error Grave', ''); 
    
      const user = await MeasuresModel.findById(clientId);
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

  static async saveMeasure(req: Request, res: Response) {
  
    try {

      const data: Measure = req.body;

      const user = new MeasuresModel(data);
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
    
      await MeasuresModel.deleteOne({ _id: id })
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