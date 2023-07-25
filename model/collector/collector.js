import {model,Schema,ObjectId} from 'mongoose';

const registerCollector= new Schema(
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
    location: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    patience: [{
      type: Schema.Types.ObjectId,
      ref: 'Patients',
    }]
  },
  {
    timestamps: true,
  }
);

export default model('Collector',registerCollector);