import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({

  date: {
    type: String,
    require: true
  },
  product: {
    type: Object,
    require: true
  },
  seller: {
    type: mongoose.Types.ObjectId,
    ref: 'users',
    require: true,
  }

});

export const OrderModel = mongoose.model('Orders', OrderSchema)