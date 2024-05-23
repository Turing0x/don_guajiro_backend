import mongoose from 'mongoose';

const ConceptsSchema = new mongoose.Schema({

  name: {
    type: String,
    require: false,
    default: true
  },

});

export const ConceptsModel = mongoose.model('concepts', ConceptsSchema)