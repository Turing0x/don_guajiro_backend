import mongoose from 'mongoose';

const EntitySchema = new mongoose.Schema({

  name: {
    type: String,
    require: true
  },

});

export const EntityModel = mongoose.model('entities', EntitySchema)