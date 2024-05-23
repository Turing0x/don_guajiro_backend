import { Response, Request } from 'express';

import { sendRes } from '../../../helpers/send.res';
import { Product } from '../interface/product.interface';
import { ProductModel } from '../models/product.model';

export class ProductsControllers {

  static async getAllProducts (req: Request, res: Response) {

    try {
      const products = await ProductModel.find()
        .populate(['measure_unit', 'clasification', 'concept'])
        .lean();;
      return sendRes(res, 200, true, 'Datos Obtenidos', products)
      ;
    } catch (error) { 
      if (error instanceof Error) {
        return sendRes(res, 500, false, 'Error Grave', error.message); 
      } else {
        return sendRes(res, 500, false, 'Error Grave', '');
      }
    }

  }

  static async getProductsById (req: Request, res: Response) {

    try {

      const { clientId } = req.params;
      if (!clientId) return sendRes(res,
        500,
        false,
        'Error Grave', ''); 
    
      const user = await ProductModel.findById(clientId)
        .populate(['measure_unit', 'clasification', 'concept'])
        .lean();
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

  static async saveProduct(req: Request, res: Response) {
  
    try {

      const data: Product = req.body;
      
        const prod = new ProductModel(data);
        await prod.save();
        
      

      return sendRes(res, 200, true, 'Usuario Creado Exitosamente', '');
      
    } catch (error) {
      return sendRes(res, 500, false, 'Ha ocurrido algo grave', error);
    }

  }

  static async deleteProduct (req: Request, res: Response) {

    try {
      
      const { id } = req.params;
      if( !id ) return sendRes(res, 500, false, 'Usuario no encontrado', ''); 
    
      await ProductModel.deleteOne({ _id: id })
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