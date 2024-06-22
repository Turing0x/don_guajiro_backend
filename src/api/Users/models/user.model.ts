import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({

  enable: {
    type: Boolean,
    require: false,
    default: true
  },
  name: {
    type: String,
    require: true
  },
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  role: {
    type: String,
    default: 'guest',
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'entities',
    require: true
  }

});

export const UserModel = mongoose.model('users', UserSchema)