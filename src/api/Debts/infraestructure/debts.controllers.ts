import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { DebtModel } from '../models/debts.model';
import { Debt } from '../interface/debts.interface';

async function getAllDebts(req: Request, res: Response) {

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

    const existingDebt = await DebtModel.findById(data._id);
    if (existingDebt) {

      const newObj = Object.assign(existingDebt, data);
      const newData = new DebtModel(newObj);

      await DebtModel.findByIdAndUpdate(data._id, newData, { new: true });
      return sendRes(res, 200, true, 'Operación Editada Exitosamente', '');
    }
    
    const debt = new DebtModel({
      ...data,
      owner: res.userData?.id
    });

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
