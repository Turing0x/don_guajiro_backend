import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { SalesModel } from '../models/sales.model';
import { Sale } from '../interface/sales.interface';

async function getAllSales(req: Request, res: Response) {

  try {
    const { date, entity } = req.query;

    const sales = await SalesModel.find(
      { $and: [{ date }, { entity }] }
    ).lean();

    return sendRes(res, 200, true, 'Datos Obtenidos', sales);

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

async function getSalesById(req: Request, res: Response) {

  try {

    const { id } = req.params;
    if (!id) return sendRes(res,
      200,
      false,
      'Ha ocurrido algo grave', '');

    const debt = await SalesModel.findById(id);
    if (!debt) return sendRes(res, 200, false, 'Venta no encontrado', '');

    return sendRes(res, 200, false, 'Resultado de la búsqueda', debt);

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

async function saveSale(req: Request, res: Response) {

  try {

    const debt = new SalesModel(req.body as Sale);
    await debt.save();
    return sendRes(res, 200, true, 'Venta Registrada Exitosamente', '');

  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
  }

}

async function deleteSale(req: Request, res: Response) {

  try {

    const { id } = req.params;
    if (!id) return sendRes(res, 200, false, 'Operación no encontrada', '');

    await SalesModel.deleteOne({ _id: id })
    return sendRes(res, 200, true, 'Venta Eliminada Correctamente', '');

  } catch (error) {
    if (error instanceof Error) {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
    } else {
      return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
    }
  }

}

export const SalesControllers = {
  getAllSales,
  getSalesById,
  saveSale, 
  deleteSale
}