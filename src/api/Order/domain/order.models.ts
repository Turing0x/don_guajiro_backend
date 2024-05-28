import mongoose from 'mongoose';
import { ProductModel } from '../../Product/domain/product.models';

const OrderSchema = new mongoose.Schema({

  date: {
    type: String,
    require: true
  },
  product_list: {
    type: Array,
    require: true
  },
  total_amount: {
    type: Number,
    require: false
  },
  seller: {
    type: Object,
    require: true,
  }

});

export const OrderModel = mongoose.model('Orders', OrderSchema)