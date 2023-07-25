import {model,Schema,ObjectId} from 'mongoose';

const adminSchema = new Schema(
  {
   
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

export default model('Admin',adminSchema);
