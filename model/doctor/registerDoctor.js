import {model,Schema,ObjectId} from 'mongoose';

const registerDoctor = new Schema(
  {
    name: {
        type: String,
        required: true,
      },
       
      id:{
        type: String,
        required: true,
      },
      phone: {
        type: Number,
        required: true,
      },
      specialisation: {
        type: String,
        required: true,
      },
   
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    otp: {
      type: Number,
      default:"",
    }
  },
  {
    timestamps: true,
  }
);

export default model('Doctor',registerDoctor);