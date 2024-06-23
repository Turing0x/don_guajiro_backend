import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  price: {
    type: Number,
    require: false,
  },
  inStock: {
    type: Number,
    require: true,
  },
  cantToBuy: {
    type: Number,
    require: true,
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entities',
    require: true
  }

});

export const ProductModel = mongoose.model('products', ProductSchema)