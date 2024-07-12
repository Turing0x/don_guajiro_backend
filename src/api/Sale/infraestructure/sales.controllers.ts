import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { SalesModel } from '../models/sales.model';
import { Sale } from '../interface/sales.interface';
import { ProductModel } from '../../Product/domain/product.models';

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

async function getSalesByRange(req: Request, res: Response) {
  try {
    const { startDate, endDate, entity } = req.query;

    let sales = await SalesModel.find({ entity })
      .lean();

    const parseDate = (dateString: string) => {
      const [day, month, year] = dateString.split('/').map(Number);
      return new Date(year, month - 1, day);
    };

    sales = sales.filter(sale => {
      const date = parseDate(sale.date as string);
      return date >= parseDate(startDate as string) && date <= parseDate(endDate as string);
    });

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

    const getter = await ProductModel.findOne({name: debt.product});
    if (getter) {
      await ProductModel.findByIdAndUpdate(getter._id,
        { $set: { inStock: (getter.inStock || 0) - debt.cantToBuy! } },
      );
    }

    return sendRes(res, 200, true, 'Venta Registrada Exitosamente', '');

  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', error);
  }

}

async function deleteSale(req: Request, res: Response) {

  try {

    const { id } = req.params;
    if (!id) return sendRes(res, 200, false, 'Operación no encontrada', '');

    const getter = await SalesModel.findById(id);

    await SalesModel.deleteOne({ _id: id });
    
    const getterProd = await ProductModel.findOne({name: getter!.product});
    if (getterProd) {
      await ProductModel.findByIdAndUpdate(getterProd._id,
        { $set: { inStock: (getterProd.inStock || 0) - getter!.cantToBuy! } },
      );
    }

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
  getSalesByRange,
  getSalesById,
  getAllSales,
  saveSale, 
  deleteSale
}