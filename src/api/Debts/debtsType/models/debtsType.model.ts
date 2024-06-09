import mongoose from 'mongoose';

const DebtTypeSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  status: {
    type: Boolean,
    default: true,
    require: true,
  }

});

export const DebtTypeModel = mongoose.model('debtsTypes', DebtTypeSchema)