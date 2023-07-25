import { model, Schema, ObjectId } from "mongoose";

const rangeInfoSchema = new Schema({
  ageUpto: {
    type: Number,
    required: false,
  },
  low: {
    type: Number,
    required: false,
  },
  high: {
    type: Number,
    required: false,
  },
  refRange: {
    type: Number,
    required: false,
  },

  patienceresult: {
    type: String,
    default: "",
  },
});

const optionsSchema = new Schema({
  code: {
    type: String,
    required: false,
  },
  option: {
    type: String,
    required: false,
  },
})

const testSubCategory = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
      unique: true,
    },
    units: {
      type: String,
      required: true,
    },
    normalValue: {
      type: String,
      required: true,
    },
    Rate: {
      type: Number,
      default: 0,
    },

    defaultValue: {
      type: String,
      // required: true
    },
    tatinMinute: {
      type: Number,
      required: true,
    },
    deltaLimit: {
      type: Number,
      required: true,
    },
    deltaCheckTime: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "Not Verified",
    },
    testParameter: [
      {
        type: String,
      },
    ],
    rangeForMale: {
      type: [rangeInfoSchema],
      required: false,
    },
    rangeForFemale: {
      type: [rangeInfoSchema],
      required: false,
    },

    patienceresult: {
      type: String,
      default: "",
    },

    listName: {
      type: String,
    },

    sampleCollection: {
      type: String,
    },

    date: {
      type: Date,
    },

    time: {
      type: String,
    },

    sampleType: {
      type: String,
      required: false,
      default: "blood",
    },

    reportDelivery: {
      type: String,
    },

    reportFormat: {
      type: String,
    },

    sampleno:{
      type: Number,
    },

    // error part 

    collect: {
      type: String,
      // required: true,
    },


    shortname: {
      type: String,
      // required: true,
    },

    pricelist: {
      type: String,
      // required: true,
    },

    account:[
      { type: Schema.Types.ObjectId, ref: "Account", required: false },
    ],


    barcodeId: {
      type: String,
      default:"ABC"
    },

    options: {
      type: [optionsSchema],
      required: false,
    },

    category: [
      { type: Schema.Types.ObjectId, ref: "TestCategory", required: true },
    ],

    account: [{ type: Schema.Types.ObjectId, ref: "Account", required: true }],
  },

  {
    timestamps: true,
  }
);

export default model("TestSubcategory", testSubCategory);
