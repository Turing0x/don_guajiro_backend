import { Entity } from './../../Entity/models/entity.model';
import mongoose from 'mongoose';

const SalesSchema = new mongoose.Schema({

  price: {
    type: Number,
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
  owner: {
    type: String,
    required: true
  },
  entity: {
    type: mongoose.Types.ObjectId,
    ref:'entities',
    require: true
  }

});

export const SalesModel = mongoose.model('sales', SalesSchema)