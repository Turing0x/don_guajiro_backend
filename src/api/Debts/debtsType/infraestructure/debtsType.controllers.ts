import { Response, Request } from 'express';
import { sendRes } from '../../../../helpers/send.res';
import { DebtModel } from '../../models/debts.model';
import { DebtTypeModel } from '../models/debtsType.model';

export class DebtsTypeControllers {

    static async getAllDebtsType(req: Request, res: Response) {
        try {

            const debtsType = await DebtTypeModel.find({status: true})
            return sendRes(res, 200, true, 'Datos Obtenidos', debtsType);
        } catch (error) {
            if (error instanceof Error) {
                return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
            } else {
                return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        }
    }


    static async SaveDebtsType(req: Request, res: Response) {

        try {
            let { name } = req.body;
            name = name.toLowerCase();

            const debt = await DebtTypeModel.findOne({ name });
            if (debt) return sendRes(res, 400, false, 'Ya existe este nombre', '');

            const debtsType = await DebtTypeModel.create({ name, status: true })
            return sendRes(res, 200, true, 'Datos Obtenidos', debtsType);
        } catch (error) {
            if (error instanceof Error) {
                return sendRes(res, 200, false, 'Ha ocurrido algo grave', error.message);
            } else {
                return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
            }
        }

    }
}