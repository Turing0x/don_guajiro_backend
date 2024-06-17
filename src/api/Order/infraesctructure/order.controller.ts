import { Response, Request } from 'express';

import { OrderModel } from '../domain/order.models';
import { ProductModel } from '../../Product/domain/product.models';
import { sendRes } from '../../../helpers/send.res';
import { Order } from '../models/order.model';
import { UserModel } from '../../Users/models/user.model';

async function getAllOrders(req: Request, res: Response) {
  try {

    const { date, userId } = req.query;

    const user = await UserModel.findById(userId);
    if (!user) return sendRes(res, 200, false, 'El usuario no existe', '');

    if ( user.role === 'seller' ) {

      const orders = await OrderModel.find(
        { $and: [{ date }, { seller: userId }] })
        .populate('seller').lean();
    
      for (const order of orders) {
        const prod = await ProductModel.findById(order.product.id);
        if (prod) {
          const cantToBuy = order.product.cantToBuy;
          prod.cantToBuy = cantToBuy;
          order.product = prod;
        }
      }

      return sendRes(res, 200, true, 'Resultado de la búsqueda', orders);
      
    } else {

      const orders = await OrderModel.find({ date })
        .populate('seller').lean();
    
      for (const order of orders) {
        const prod = await ProductModel.findById(order.product.id);
        if (prod) {
          const cantToBuy = order.product.cantToBuy;
          prod.cantToBuy = cantToBuy;
          order.product = prod;
        }
      }

      return sendRes(res, 200, true, 'Resultado de la búsqueda', orders);

    }

  } catch (error) {
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
  }
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

    const orders = await OrderModel.find({ date })
      .populate('product').lean();
    orders.forEach( async(order) => {

      const prod = await ProductModel.findById(order.product);
      if (prod) {
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
    await subtractStockOfProducts(order.product.id);

    return sendRes(res, 200, true, 'Venta registrada', '');
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function deleteOrderById(req: Request, res: Response) {
  
  try {

    const { orderId } = req.params;
    if( !orderId ) return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');; 

    const getter = await OrderModel.findById(orderId);
    await addStockOfProducts(String(getter?.product['id']))
    await OrderModel.deleteOne({_id: orderId});
    
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); }

}

async function subtractStockOfProducts(id: string) {
  const getter = await ProductModel.findById(id);
  if (getter) {
    await ProductModel.findByIdAndUpdate(getter._id,
      { $set: { inStock: (getter.inStock || 0) - (getter.cantToBuy || 0) } },
    );
  } 
}

async function addStockOfProducts(id: string) {
  const getter = await ProductModel.findById(id);
  if (getter) {
    await ProductModel.findByIdAndUpdate(getter._id,
      { $set: { inStock: (getter.inStock || 0) + (getter.cantToBuy || 0) } },
    );
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