import {model,Schema,ObjectId} from 'mongoose';

const appointmentSchema = new Schema({
  patId: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  patienceName: {
    type: String,
    required: true
  },
  investigation: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  visitby: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  opetatorId: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  }
});


export default model('Appointment',appointmentSchema);