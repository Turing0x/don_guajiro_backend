import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { DebtModel } from '../models/debts.model';
import { Debt } from '../interface/debts.interface';

export class DebtsControllers {

  static async getAllDebts (req: Request, res: Response) {

    try {
      const { date } = req.query;
      const debts = await DebtModel.find({date}).lean();
      return sendRes(res, 200, true, 'Datos Obtenidos', debts);
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Error Grave', '');
      }
    }

  }

  static async getDebtsById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Error Grave', ''); 
    
      const debt = await DebtModel.findById(id);
      if (!debt) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
      
      return sendRes(res, 200, false, 'Resultado de la búsqueda', debt); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'mess_0', error.message); 
      } else {
        return sendRes(res, 200, false, 'mess_0', '');
      }
    }

  }

  static async saveDebt(req: Request, res: Response) {
  
    try {

      const data: Debt = req.body;
      if (data._id) {
        const existingDebt = await DebtModel.findById(data._id);
        const newData = new DebtModel({
          _id: data._id ?? existingDebt!._id,
          type: data.type ?? existingDebt!.type,
          money: data.money ?? existingDebt!.money,
          description: data.description ?? existingDebt!.description,
          date: data.date ?? existingDebt!.date,
        });
        await DebtModel.findByIdAndUpdate(data._id, newData, { new: true });
        return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      }

      const debt = new DebtModel(data);
      await debt.save();
      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteDebt (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 200, false, 'Usuario no encontrado', ''); 
    
      await DebtModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Usuario Eliminado Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Error Interno', error.message); 
      } else {
        return sendRes(res, 200, false, 'Error Interno', '');
      }
    }

  }

}