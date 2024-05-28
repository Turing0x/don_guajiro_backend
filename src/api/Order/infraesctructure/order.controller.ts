import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { ProductModel } from '../../Product/domain/product.models';
import { sendRes } from '../../../helpers/send.res';
import { Order } from '../models/order.model';
import { Product } from '../../Product/models/product.model';

async function getAllOrders(req: Request, res: Response) {
  try {

    const { date } = req.params
    const orders = await OrderModel.find({ date });
    
    return sendRes(res, 200, true, 'Resultado de la búsqueda', orders);

  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }
}

async function getAllRequested(req: Request, res: Response) {
  try {

    const { date } = req.params
    const orders = await OrderModel.find({ date });
    
    return sendRes(res, 200, true, 'Resultado de la búsqueda', orders);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }
}

async function getOrdersByCommercial(req: Request, res: Response) {
  try {

    const { date, commercialCode } = req.params

    const orders = await OrderModel.find(
      { $and: [{ date }, { 'seller.commercial_code': commercialCode }] });
    return sendRes(res, 200, true, 'Resultado de la búsqueda', orders);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }
}

async function getOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
  
    const order = await OrderModel.findById(orderId);
    if (!order) return sendRes(res, 200, false, 'Order no encontrado', '');

    return sendRes(res, 200, true, 'Resultado de la búsqueda', order);    
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function getDailyResume(req: Request, res: Response) {
  
  try {

    const { date } = req.params;
    const map = new Map()
    const list = []

    const orders = await OrderModel.find({ date });
    orders.forEach(order => {
      for (const prod of order.product_list) {
        if (!map.has(prod._id)) {
          prod.cantToBuy = 1;
          map.set(prod._id, prod);
        } else {
          const finalcantToBuy = map.get(prod._id).cantToBuy + prod.cantToBuy;
          prod.cantToBuy = finalcantToBuy;
          map.set(prod._id, prod);
        }
      }
    });

    for (const val of map.values()) {
      list.push(val);
    }

    return sendRes(res, 200, true, 'Resultado de la búsqueda', list);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function saveOrder(req: Request, res: Response) {
  
  try {
    
    const order: Order = req.body;

    const Order = new OrderModel(order);

    await Order.save();
    await subtractStockOfProducts(order.product_list);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function deleteOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');; 

    const getter = await OrderModel.findById(orderId);
    await addStockOfProducts(getter!.product_list)
    await OrderModel.deleteOne({_id: orderId});
    
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function subtractStockOfProducts(product_list: Product[]) {
  for (const product of product_list) {
    const getter = await ProductModel.findById(product['_id']);
    if (getter) {
      await ProductModel.findByIdAndUpdate(product['_id'],
        { $set: { inStock: getter!.inStock! - product['cantToBuy'] } },
      );
    } 
  }
}

async function addStockOfProducts(product_list: Product[]) {
  for (const product of product_list) {
    const getter = await ProductModel.findById(product['_id']);
    if (getter) {
      await ProductModel.findByIdAndUpdate(product['_id'],
        { $set: { inStock: getter!.inStock! + product['cantToBuy'] } },
      );
    }
  }
}

export const OrderControllers = {
  getOrdersByCommercial,
  deleteOrderById,
  getAllRequested,
  getDailyResume,
  getAllOrders,
  getOrderById,
  saveOrder
}