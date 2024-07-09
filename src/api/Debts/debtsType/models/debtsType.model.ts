import mongoose from 'mongoose';

const DebtTypeSchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },
  side: {
    type: Boolean,
    default: true,
  }

});

export const DebtTypeModel = mongoose.model('debtsTypes', DebtTypeSchema)