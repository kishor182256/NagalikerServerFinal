import { model, Schema, ObjectId } from "mongoose";

const patientCardSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: String
  },
  emailAddress: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  prefix: {
    type: String,
    required: true,
    
  },
  suffix: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  patientId: {
    type: String,
    default:"ABCDE"
    },
  status: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  labNumber: {
    type: String,
    default:1245
  },
  referredBy:[{
    type: Schema.Types.ObjectId,
    ref: 'Doctor',
  }]
},{
  timestamps: true,
});

export default model('PatientCard', patientCardSchema);

