import { Response, Request } from 'express';

import { ProductModel } from '../domain/product.models';
import { sendRes } from '../../../helpers/send.res';
import { Product } from '../models/product.model';

async function getAllProducts(req: Request, res: Response) {
  try {

    const products = (await ProductModel.find())
      .filter( product => product.inStock !== 0 );
    return sendRes(res, 200, true, 'Resultado de la búsqueda', products);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');}
}

async function getProductById(req: Request, res: Response) {
  
  try {

    const { productId } = req.params;
    if( !productId ) return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); 

    const product = await ProductModel.findById(productId);
    if (!product) return sendRes(res, 200, false, 'Producto no encontrado', '');
    
    return sendRes(res, 200, true, 'Resultado de la búsqueda', product);
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');}

}

async function saveProduct(req: Request, res: Response) {
  
  try {

    const prod: Product = req.body;
  
    const Product = new ProductModel(prod);
    await Product.save();
      
    return sendRes(res, 200, true, 'Producto guardado con éxito', '');

  } catch (error) {
    console.log(error);
    return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');
  }

}

async function editProduct(req: Request, res: Response) {
  
  try {

    const prod: Product = req.body;
    console.log(prod);
  
    const product = await ProductModel.findById(prod._id)
    if (!product) return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');

    
    const product_obj = {
      name: prod.name ?? product.name,
      category: prod.category ?? product.category,
      price: prod.price ?? product.price,
      inStock: (product.inStock ?? 0) + prod.inStock,
    };

    await ProductModel.findByIdAndUpdate(prod._id, product_obj)
  
    return sendRes(res, 200, true, 'Producto Editado', '');
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');}

}

async function deleteProductById(req: Request, res: Response) {
  
  try {

    const { productId } = req.params;
    if( !productId ) return sendRes(res, 200, false, 'Ha ocurrido algo grave', ''); 
  
    await ProductModel.deleteOne({ _id: productId })
    
    return sendRes(res, 200, true, 'Producto Eliminado', '');
    
  } catch (error) { return sendRes(res, 200, false, 'Ha ocurrido algo grave', '');}

}

export const ProductControllers = {
  deleteProductById,
  getAllProducts,
  getProductById,
  saveProduct,
  editProduct,
}