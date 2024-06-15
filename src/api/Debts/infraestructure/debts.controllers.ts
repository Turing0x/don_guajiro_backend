import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { DebtModel } from '../models/debts.model';
import { Debt } from '../interface/debts.interface';
import jwt from 'jsonwebtoken';
import { UserModel } from '../../Users/models/user.model';


export class DebtsControllers {

  static async getAllDebts (req: Request, res: Response) {

    try {
      const { date } = req.query;
      if( date ) {
        const debts = await DebtModel.find({date}).lean().populate('type');
        return sendRes(res, 200, true, 'Datos Obtenidos', debts);
      }
      else {
        const debts = await DebtModel.find().populate('type');
        return sendRes(res, 200, true, 'Datos Obtenidos', debts);
      }
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async getDebtsById (req: Request, res: Response) {

    try {

      const { id } = req.params;
      if (!id) return sendRes(res,
        200,
        false,
        'Ha ocurrido algo grave', ''); 
    
      const debt = await DebtModel.findById(id);
      if (!debt) return sendRes(res, 200, false, 'Operación no encontrada', ''); 
      
      return sendRes(res, 200, false, 'Resultado de la búsqueda', debt); 
      
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

  static async saveDebt(req: Request, res: Response) {

    const { token } = req.params;

    if( !token ) return sendRes(res, 400, false, 'No se ha enviado el token', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY_APP!) as { user_id: string }

    const user = await UserModel.findById( decoded['user_id'] );

  
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
        return sendRes(res, 200, true, 'Operación Editada Exitosamente', '');
      }

      const debt = new DebtModel({
        ...data,
        owner:decoded['user_id']
      });
      await debt.save();
      return sendRes(res, 200, true, 'Operación Creada Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteDebt (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 200, false, 'Operación no encontrada', ''); 
    
      await DebtModel.deleteOne({ _id: id })
      return sendRes(res, 200, true, 'Operación Eliminada Correctamente', '');

    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
      } else {
        return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
      }
    }

  }

}