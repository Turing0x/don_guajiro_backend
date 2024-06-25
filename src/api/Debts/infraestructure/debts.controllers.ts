import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { DebtModel } from '../models/debts.model';
import { Debt } from '../interface/debts.interface';

async function getAllDebts(req: Request, res: Response) {

  try {
    const { date } = req.query;

    const debts = await DebtModel.find({ date }).lean()
      .populate('type');
      
    return sendRes(res, 200, true, 'Datos Obtenidos', debts);
    
  } catch (error) { 
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message); 
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

async function getDebtsById (req: Request, res: Response) {

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

async function saveDebt(req: Request, res: Response) {

  try {

    const data: Debt = req.body;

    const debt = new DebtModel(data);
    await debt.save();

    return sendRes(res, 200, true, 'Operación Creada Exitosamente', '');
    
  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
  }

}

async function deleteDebt(req: Request, res: Response) {

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

export const DebtsControllers = {
  getAllDebts,
  getDebtsById,
  saveDebt,
  deleteDebt
}
