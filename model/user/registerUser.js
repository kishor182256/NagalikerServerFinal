import {model,Schema,ObjectId} from 'mongoose';

const registerUser= new Schema(
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
    auditlockdays: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    password: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);

export default model('User',registerUser);