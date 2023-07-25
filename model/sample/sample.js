import { model, Schema, ObjectId } from "mongoose";

const registerSample = new Schema(
  {
    sampleFromname: {
      type: String,
      required: true,
    },

    phone: {
      type: Number,
      required: true,
    },

    sampleId: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    sampleby: {
      type: String,
      required: true,
      default: "Yes",
    },
  },
  {
    timestamps: true,
  }
);

export default model("Sample", registerSample);
