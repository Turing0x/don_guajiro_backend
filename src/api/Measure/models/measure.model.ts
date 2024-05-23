import mongoose from 'mongoose';

const MeasureSchema = new mongoose.Schema({

  name: {
    type: String,
    require: false
  },
  acronym: {
    type: String,
    require: false
  },

});

export const MeasuresModel = mongoose.model('measures', MeasureSchema)