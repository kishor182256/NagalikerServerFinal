import { model, Schema, ObjectId } from "mongoose";

const reportFormat = new Schema(
  {
    reportId: {
      type: String,
    //   required: true,
    },
    reportName: {
      type: String,
    //   required: true,
    },
    reportshortName: {
        type: String,
      //   required: true,
      },
    reportTat: {
      type: Number,
      required: true,
    },
    reportcategory: [{
        type: Schema.Types.ObjectId,
        ref: 'TestCategory'
      }],

      reportsubcategory: [{
        type: Schema.Types.ObjectId,
        ref: 'TestSubcategory'
      }],
    
    sample: {
      type: String,
    }
    
  },
  {
    timestamps: true,
  }
);

export default model("ReportFormat", reportFormat);
