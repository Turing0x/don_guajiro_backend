import { Entity } from './../../Entity/models/entity.model';
import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({

  price: {
    type: Number,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  product: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  },
  cantToBuy: {
    type: Number,
    require: true
  },
  unities: {
    type: Number,
    require: true
  },
  entity: {
    type: mongoose.Types.ObjectId,
    ref:'entities',
    require: true
  }

});

export const SalesModel = mongoose.model('sales', SalesSchema)