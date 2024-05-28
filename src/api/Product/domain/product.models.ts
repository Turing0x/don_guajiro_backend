import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    require: false
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
  }

});

export const ProductModel = mongoose.model('products', ProductSchema)