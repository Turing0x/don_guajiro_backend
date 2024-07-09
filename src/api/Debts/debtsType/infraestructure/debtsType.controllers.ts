import { Response, Request } from 'express';
import { sendRes } from '../../../../helpers/send.res';
import { DebtTypeModel } from '../models/debtsType.model';

async function getAllDebtsType(req: Request, res: Response) {
  try {

    const debtsType = await DebtTypeModel.find()
    return sendRes(res, 200, true, 'Datos Obtenidos', debtsType);

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }
}

async function SaveDebtsType(req: Request, res: Response) {

  try {
    let { name , side} = req.body;
    if (!name ) return sendRes(res, 200, false, 'Rellene el campo', '');
    name = name.toLowerCase();

    const debt = await DebtTypeModel.findOne({ name });
    if (debt) return sendRes(res, 200, false, 'Ya existe este nombre', '');

    await DebtTypeModel.create({ name, side })
    return sendRes(res, 200, true, 'Datos Obtenidos', await DebtTypeModel.find());
  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

async function deleteDebtsType(req: Request, res: Response) {

  try {
    await DebtTypeModel.deleteOne({ _id: req.params.id });
    return sendRes(res, 200, true, 'Operación Eliminada Exitosamente', await DebtTypeModel.find());
  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

export const DebtsTypeControllers = {
  getAllDebtsType,
  SaveDebtsType,
  deleteDebtsType
}