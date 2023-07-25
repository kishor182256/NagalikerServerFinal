import { model, Schema, ObjectId } from "mongoose";

const testCategory = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    prefix: {
      type: String,
      required: true,
      unique: true,

    },
    suffix: {
      type: String,
      required: true,
      unique: true,

    },
    lastnumber: {
      type: Number,
      required: true,
      unique: true,

    },
    unit: {
      type: String,
      required: true,
      default:'gm/ml'
    }
    ,
    subcategories: [{
      type: Schema.Types.ObjectId,
      ref: 'TestSubcategory'
    }]
    
  },
  {
    timestamps: true,
  }
);

export default model("TestCategory", testCategory);
