import mongoose, { Mongoose } from 'mongoose';

const ClasificationsSchema = new mongoose.Schema({

  name: {
    type: String,
    require: false,
    default: true
  },
  concept: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
    default: true,
    ref: 'concepts'
  }

});

export const ClasificationsModel = mongoose.model('clasifications', ClasificationsSchema)