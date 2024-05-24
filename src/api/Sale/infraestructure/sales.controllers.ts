import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { SalesModel } from '../models/sales.model';
import { Sale } from '../interface/sales.interface';

export class SalesControllers {

  static async getAllSales (req: Request, res: Response) {

    try {
      const { date, pending } = req.query;
      if (pending === 'false') {
        const sales = await SalesModel.find(
          {$and: [{date}, {finished: true}]}
        ).lean();
        return sendRes(res, 200, true, 'Datos Obtenidos', sales);
      }

      const sales = await SalesModel.find(
        {$and: [{date}, {finished: false}]}
      ).lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', sales);
    
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Error Grave', '');
      }
    }

  }
  
  static async getSalesById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Error Grave', ''); 
    
      const debt = await SalesModel.findById(id);
      if (!debt) return sendRes(res, 200, false, 'Venta no encontrado', ''); 
      
      return sendRes(res, 200, false, 'Resultado de la búsqueda', debt); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 200, false, 'mess_0', '');
      }
    }

  }

  static async saveSale(req: Request, res: Response) {
  
    try {

      const data: Sale = req.body;
      const debt = new SalesModel(data);
      await debt.save();
      return sendRes(res, 200, true, 'Venta Registrada Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
    }

  }
  
  static async markSaleAsFinished (req: Request, res: Response) {
  
    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Error Grave', ''); 
    
      const debt = await SalesModel.findById(id);
      if (!debt) return sendRes(res, 200, false, 'Venta no encontrado', ''); 
      
      debt.finished = true;
      await debt.save();
      return sendRes(res, 200, true, 'Venta Registrada Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteSale (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 200, false, 'Operación no encontrada', ''); 
    
      await SalesModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Operación Eliminada Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 200, false, 'Error Interno', '');
      }
    }

  }

}