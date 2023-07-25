import {model,Schema,ObjectId} from 'mongoose';

const registerAccount= new Schema(
  {
    name: {
        type: String,
        required: true,
      },
       
      phone: {
        type: Number,
        required: true,
      },
   
    email: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    keyperson: {
        type: String,
        required: true,
    },

    computername: {
        type: String,
        required: true,
    },
    prefix: {
        type: String,
        required: true,
    }
  },
  {
    timestamps: true,
  }
);

export default model('Account',registerAccount);