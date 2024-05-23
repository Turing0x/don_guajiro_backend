import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({

  code: {
    type: String,
    require: false,
    default: true
  },
  name: {
    type: String,
    require: true
  },
  measure_unit: {
    type: String,
    ref: 'measures',
    require: true
  },
  clasification: {
    type: String,
    ref: 'clasifications',
    require: true
  },
  initial_inventary: {
    type: Number,
    require: true
  },
  concept: {
    type: String,
    ref: 'concepts',
    require: true
  },
  conversion_fact: {
    type: Number,
    require: true
  }

});

export const ProductModel = mongoose.model('products', ProductSchema)