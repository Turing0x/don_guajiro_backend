import mongoose from 'mongoose';

const DebtSchema = new mongoose.Schema({

  type: {
    type: String,
    require: true
  },
  money: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  date: {
    type: String,
    require: true
  }

});

export const DebtModel = mongoose.model('debts', DebtSchema)