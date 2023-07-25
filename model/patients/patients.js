import { model, Schema, ObjectId } from "mongoose";

const addPatients = new Schema(
  {
    labpre: [
      {
        type: String,
        required: true,
      },
    ],

    labnumber: {
      type: Number,
      required: true,
    },

    firstname: {
      type: String,
      required: true,
    },
    age:{
      type: Number,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    refID: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
   
    email: {
      type: String,
      required: true,
    },

    notes: {
      type: String,
      required: false,
    },
    urgetrequired: {
      type: Boolean,
      required: false,
      default: false,
    },
    sendrepby: {
      type: String,
    },
    sampleFrom: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    samplestatus: {
      type: String,
      required: false,
    },
    sampleType:{
      type: String,
      required: false,
    },
    sampleStatus: {
      type: String,
      default:"Pending",
    },
    barcodeId: {
      type: String,
    },
    totalamount: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
    },
    netamount: {
      type: Number,
      required: true,
    },
    paidamount: {
      type: Number,
      required: true,
    },
    mode:{
     type:String
    },
    dueamount: {
      type: Number,
      required: true,
    },
    discountreason: {
      type: String,
      required: true,
    },
    reportDelivery:{
      type: String,
      required: true,
    },
    foc: {
      type: Number,
    },
    collector: {
      type: Schema.Types.ObjectId,
      ref: "Collector",
    },
    accountVal: [
      {
        type: Schema.Types.ObjectId,
        ref: "Account",
      },
    ],
    reportcategory: [
      {
        type: Schema.Types.ObjectId,
        ref: "TestCategory",
      },
    ],
    referedby:[
      {
        type: Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    subcategories: [
      {
        type: Schema.Types.ObjectId,
        ref: "TestSubcategory",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model("Patients", addPatients);
