import Collector from "../../model/collector/collector.js";
import Patients from "../../model/patients/patients.js";
import PatientCard from "../../model/patients/PatienceCard.js";
import ReportFormat from "../../model/reportFormat/reportFormat.js";
import { model, Schema, ObjectId } from "mongoose";
import TestSubcategory from "../../model/masterdata/testSubcategory.js";
import mongoose from 'mongoose';
// import { editPatienceCard } from './patience';

export const registerPatience = async (req, res) => {
  const {
    labprescition,
    labnumber,
    sampleFrom,
    totalamount,
    discount,
    city,mode
,    lastname,
    firstname,
    gender,
    date,
    samplestatus,
    netamount,
    sample,
    referedby,
    age,
    address,
    refID,
    paidamount,
    dueamount,
    discountreason,
    phone,sampleType,
    reportcategory,
    subcategories,
    reportDelivery,
    email,barcodeId,
  } = req.body;

  console.log("registerPatience", req.body.mode,req.body.barcodeId);

  try {
    let patient = await Patients.findOne({ phone: phone });

    if (patient) {
      const newValues = {
        labprescition,
        labnumber,
        sampleFrom,
        totalamount,
        discount,
        city,
        lastname,
        firstname,
        gender,
        date,
        samplestatus,
        netamount,
        sample,barcodeId,
        referedby,
        age,
        address,
        refID,
        paidamount,
        dueamount,
        discountreason,
        phone,
        reportcategory,
        subcategories,
        reportDelivery,
        email,sampleType,mode
      };
      if (!patient.data) {
        patient.data = [];
      }

      // Add the new values to the patient's data array
      patient.data.push(newValues);

      // Save the updated patient data
      await patient.save();
    } else {
      patient = await new Patients({
        labprescition,
        reportcategory,
        subcategories,
        labnumber,
        totalamount,barcodeId,
        discount,
        lastname,
        firstname,
        gender,
        date,
        sampleFrom,
        samplestatus,
        netamount,
        city,
        referedby,
        age,
        address,
        refID,
        paidamount,
        dueamount,
        discountreason,
        phone,
        email,
        reportDelivery,
        sample,sampleType,mode
      }).save();
    }
    return res.json({
      patient,
    });
  } catch (err) {
    console.error("patients Api Error", err);
    res.json({ error: err });
  }
};

export const getpatienceList = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    const count = await Patients.countDocuments();

    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;
    const patients = await Patients.find()
      .populate("collector")
      .populate("reportcategory")
      .populate("subcategories")
      .populate("referedby")
      .skip(offset)
      .limit(limit)
      .exec();

    return res.json({
      patients,
      totalPages,
      currentPage: page,
      totalItems: count,
    });
  } catch (err) {
    console.error("Fetching API Error", err);
    res.json({ error: err });
  }
};

export const editPatienceReport = async(req, res) => {
  try {
    const id = req.params.id;
    console.log("editPatienceReport",req.body.lastname)
    const updatedPatients = await Patients.findOneAndUpdate({ _id:id }, {
      $set: {
        labprescition: req.body.labprescition,
        barcodeId: req.body.barcodeId,
        email: req.body.email,
        reportDelivery: req.body.reportDelivery,
        subcategories: req.body.subcategories,
        reportcategory: req.body.reportcategory,
        phone: req.body.phone,
        discountreason: req.body.discountreason,
        dueamount: req.body.dueamount,
        refID:req.body.refID,

        address: req.body.address,
        age: req.body.age,
        referedby: req.body.referedby,
        sample: req.body.sample,
        netamount: req.body.netamount,
        samplestatus:req.body.sampleStatus,
        date: req.body.date,


        labnumber: req.body.labnumber,
        sampleFrom: req.body.sampleFrom,
        totalamount: req.body.totalamount,
        discount: req.body.discount,
        city: req.body.city,
        mode:req.body.mode,
        lastname: req.body.lastname,
        gender: req.body.gender,
      }
    }, {
      new: true,
    }).exec();
    return res.json({
      updatedPatients,
    });
  } catch (err) {
    console.error("Update  Api Error", err);
    res.json({ error: err });
  }
}

export const deletePatience = async (req, res) => {
  try {
    const patience = req.params.id;
    const deletedpatience = await Patients.deleteOne({ _id: patience });
    return res.json({
      message: "Card removed successfully",
      deletedpatience,
    });
  } catch (err) {
    console.error("Deleted  Api Error", err);
    res.json({ error: err });
  }
};

export const getSinglePatience = async (req, res) => {
  try {
    const phone = req.params.phone;
    console.log("patienceId", phone);
    const patience = await Patients.find({ phone: phone }).populate("reportcategory")
      .populate("reportcategory")
      .populate("subcategories")
      .populate("referedby");
    return res.json(patience);
  } catch (err) {
    console.error("patienceId  Api Error", err);
    res.json({ error: err });
  }
};

export const getPatienceById = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("patienceId======>", id);
    const singlepatience = await Patients.findById({ _id: id }).populate("reportcategory")
      .populate("reportcategory")
      .populate("subcategories")
      .populate("referedby");
      return res.json(singlepatience);
  } catch (err) {
    console.error("patienceId  Api Error", err);
    res.json({ error: err });
  }
};

export const getPatientsBySubcategory = async (req, res) => {
  try {
    const phone = req.params.phone;
    const id = req.params.id;

    console.log("getPatientsBySubcategory", id);

    const patience = await Patients.findOne({ phone: phone })
      .populate("reportcategory")
      .populate({
        path: "subcategories",
        match: { _id: id },
      })
      .populate("referedby");
    return res.json({
      patience,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const updatePatientReport = async (req, res) => {
  try {
    const { phone, value, id, gender } = req.body;
    const patient = await Patients.findOne({ phone });
    const result = value.join(", ");

    const subcategory = patient.subcategories.find(
      (subcategory) => subcategory._id.toString() === id
    );

    if (subcategory) {
      const testSubcategory = await TestSubcategory.findById(subcategory._id).exec();

      if (testSubcategory) {
        const rangeKey = gender === "male" ? "rangeForMale" : "rangeForFemale";
        if (testSubcategory[rangeKey]) {
          const updatedResults = testSubcategory[rangeKey].map((ref) => {
            if (ref.result === subcategory.patienceresult) {
              return { ...ref.toObject(), result };
            } else {
              return ref.toObject();
            }
          });

          await TestSubcategory.updateOne(
            { _id: subcategory._id },
            { $set: { patienceresult: result }, status: "entered" },
            { upsert: true }
          );

          subcategory.patienceresult = result;
          subcategory.status = "entered";

          await patient.save(); // Save the updated patient object

          const updatedUser = await PatientCard.findOneAndUpdate(
            { user: req.user },
            req.body,
            { new: true }
          ).exec();

          const updatedPatient = await Patients.findOne({ phone }).populate("subcategories"); // Retrieve the updated patient object

          return res.json({ patient: updatedPatient });
        } else {
          console.log(`Range ${rangeKey} not found`);
        }
      } else {
        console.log("TestSubcategory not found");
      }
    } else {
      console.log("Subcategory not found");
    }

    res.json({ error: "Subcategory not found" });
  } catch (err) {
    console.error("Update API Error", err);
    res.json({ error: err });
  }
};




export const assigncollection = async (req, res) => {
  console.error("Fetching API", req.body);

  try {
    const collector = await Collector.findById(req.body.collectorId);
    console.log("collector", collector);

    if (collector) {
      const patience = await Patients.findById(req.body.patienceId);
      console.log("patience", patience);

      if (patience) {
        patience.collector = collector._id; // Assign collector to patience
        await patience.save(); // Save the updated patience

        res.status(201).json(patience);
      } else {
        res.json({ message: "No Patience found" });
      }
    } else {
      res.json({ message: "No Collector found" });
    }
  } catch (err) {
    console.error("Error", err);
    res.json({ error: err });
  }
};

export const registerPatienceCard = async (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    emailAddress,
    address,
    age,
    patientId,
    city,
    labNumber
  } = req.body.patients;

  const {
    gender,
    status,
    suffix,
    prefix,
    referredBy
  } = req.body;


  

  console.log("labprescition", gender, status, suffix, prefix);

  try {
    const patientsExists = await PatientCard.findOne({
      phoneNumber: phoneNumber,
    });

    if (patientsExists) {
      return res.json({ errors: "Patient already exists" });
    } else {
      const patients = await new PatientCard({
        firstName,
        lastName,
        gender,
        phoneNumber,
        emailAddress,
        address,
        prefix,
        suffix,
        age,
        patientId,
        status,
        city,
        labNumber,
        referredBy,
      }).save();

      return res.json({
        patients,
      });
    }
  } catch (err) {
    console.error("patients Api Error", err);
    res.json({ error: err });
  }
};

export const getPatienceCard = async (req, res) => {
  try {
    const { page, rowsPerPage } = req.query;
    console.log(req.query);
    const options = {
      page: parseInt(page, 10) || 1,
      limit: parseInt(rowsPerPage, 10) || 10,
    };
    const patients = await PatientCard.find().populate("referredBy").exec();

    return res.json({
      patients,
    });
  } catch (err) {
    console.error("Fetching API Error", err);
    res.json({ error: err });
  }
};


export const getSinglePatienceCard = async (req, res) => {
  try {
    const user = req.params.id;

    const singlecard= await PatientCard.findOne({_id:user});
    return res.json({
      singlecard,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const editPatienceCard = async (req, res) => {
  try {
    const id = req.params.id;
    console.log('EditPatience card',req.body)

    const updatedData = {
      ...req.body.patients, // Merge patient information
      gender: req.body.gender,
      status: req.body.status,
      referredBy: req.body.referredBy,
      suffix: req.body.suffix,
      prefix: req.body.prefix,
    };
    
    const updatedUser = await PatientCard.findOneAndUpdate({ _id:id }, updatedData,
     
       {
      new: true,
    }).exec();
    return res.json({
      updatedUser,
    });
  } catch (err) {
    console.error("Update  Api Error", err);
    res.json({ error: err });
  }
};

export const deletePatienceCard = async (req, res) => {
  try {
    const user = req.params.id;
    const deleteduser = await PatientCard.deleteOne({ _id: user });
    return res.json({
      message: "Card removed successfully",
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const getReportFormat = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    const count = await ReportFormat.countDocuments();

    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;
    const reportFormat = await ReportFormat.find()
      .populate("reportsubcategory")
      .populate("reportcategory")
      .skip(offset)
      .limit(limit)
      .exec();

    return res.json({
      reportFormat,
      totalPages,
      currentPage: page,
      totalItems: count,
    });
  } catch (err) {
    console.error("Fetching API Error", err);
    res.json({ error: err });
  }
};

export const deleteReportFormat = async (req, res) => {
  try {
    const report = req.params.id;
    const deletedreport = await ReportFormat.deleteOne({ _id: report });
    return res.json({
      message: "ReportFormat removed successfully",
      deletedreport,
    });
  } catch (err) {
    console.error("Deleted  Api Error", err);
    res.json({ error: err });
  }
};

export const singleReportFormat = async (req, res) => {
  try {
    const id = req.params.id;
    const report = await ReportFormat.findOne({ _id: id });
    return res.json({
      report,
    });
  } catch (err) {
    console.error("Fetch  Api Error", err);
    res.json({ error: err });
  }
};

export const getAllpatienceList = async (req, res) => {
  try {
    const page = parseInt(req.params.page) || 1;
    const limit = parseInt(req.params.limit) || 10;

    const count = await Patients.countDocuments();

    const totalPages = Math.ceil(count / limit);
    const offset = (page - 1) * limit;
    const patients = await Patients.find()
      .populate("collector")
      .populate("reportcategory")
      .populate("subcategories")
      .populate("referedby")
      .skip(offset)
      .limit(limit)
      .exec();

    return res.json({
      patients,
      totalPages,
      currentPage: page,
      totalItems: count,
    });
  } catch (err) {
    console.error("Fetching API Error", err);
    res.json({ error: err });
  }
};


export const editCollection = async (req, res) => {
  const { id, phone, sampleType, sampleStatus, date, time, sampleno } = req.body;

  try {
    const patient = await Patients.findOne({ phone: phone });
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const subcategoryIndex = patient.subcategories.findIndex((subcategory) =>
      new mongoose.Types.ObjectId(id).equals(subcategory._id)
    );
    if (subcategoryIndex === -1) {
      return res.status(404).json({ error: 'Subcategory not found' });
    }

    const subcategory = patient.subcategories[subcategoryIndex];

    subcategory.sampleType = sampleType;
    subcategory.sampleStatus = sampleStatus;
    subcategory.date = date;
    subcategory.time = time;
    subcategory.sampleno = sampleno;

    await patient.save();

    res.status(200).json({ message: 'Sample collection updated', subcategory: patient.subcategories[subcategoryIndex] });

  } catch (err) {
    res.status(500).json({ error: 'Error updating collection' });
    console.error("Error Updating Collection", err);
  }
}

