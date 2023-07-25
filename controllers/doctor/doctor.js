import Doctor from "../../model/doctor/registerDoctor.js";
import WebDoctor from "../../model/doctor/doctorWeb.js";
import HospitalPatient from "../../model/patients/hospitalPatience.js"

import * as config from "../../config.js";

import jwt from "jsonwebtoken";

import nodemailer from "nodemailer";
import { comparePassword, hashPassword } from "../../helper/paswordEncrypt.js";

export const registerDoctor = async (req, res) => {
  const { name, phone, email, location, id, status,specialisation } = req.body;

  try {
    const userExists = await Doctor.findOne({ email: email });

    if (userExists) {
      return res.json({ errors: "Doctor already Registered" });
    } else {
      const doctor = await new Doctor({
        name,
        specialisation,
        phone,
        email,
        location,
        id,
        status,
      }).save();

      return res.json({
        doctor,
      });
    }
  } catch (err) {
    console.error("Register Api Error", err);
    res.json({ error: err });
  }
};

export const getdoctorList = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    return res.json({
      doctors,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const getSingleDoctor = async (req, res) => {
  try {
    const doctor = req.params.id;

    const doctors = await Doctor.findOne({_id:doctor});
    return res.json({
      doctors,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const deleteDoctor = async (req, res) => {
  try {
    const doctor = req.params.id;
    console.log("deleteDoctor",doctor);
    const doctors = await Doctor.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Doctor removed successfully",
    });
    console.error("Delete  Api ", doctors);
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const editDoctor = async (req, res) => {
  try {
    const doctor = req.params.id;
    const updatedDoctor = await Doctor.findOneAndUpdate({ _id:doctor }, req.body, {
      new: true,
    }).exec();
    return res.json({
      updatedDoctor,
    });
  } catch (err) {
    console.error("Update  Api Error", err);
    res.json({ error: err });
  }
};

//Web Doctor

function generateOTP() {
  const digits = "0123456789";
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}

export const registerWebDoctor = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "kishor.repo@gmail.com",
        pass: "tzhptevphaysqgie",
      },
    });

    let otp = generateOTP();

    // Send OTP by email
    const mailOptions = {
      from: "kishor.repo@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send OTP",error});
      }

      // Save OTP in the database
      doctor.otp = otp;
      await doctor.save({ otp });
       otp = undefined;
      res.json({ message: "OTP sent successfully", doctor });
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const {
      email,
      otp,
      fullName,
      phoneNumber,
      city,
      address,
      password,
      hospitalName,
    } = req.body;
    console.log(`Verifying email and otp`,req.body)
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (doctor.otp === otp) {
      doctor.verified = true;
      const hashedPassword = await hashPassword(password);
      const webdoctor = await new WebDoctor({
        fullName,
        phoneNumber,
        email,
        city,
        address,
        password: hashedPassword,
        hospitalName,
      }).save();
      doctor.otp = "";
      res.json({ message: "OTP verified successfully", webdoctor });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

export const doctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await WebDoctor.findOne({ email });
    if (!doctor) {
      return res.json({ error: "Please register first" });
    }
    const match = await comparePassword(password, doctor.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }
    const token = jwt.sign({ _id: doctor._id }, config.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    doctor.password = undefined;
    res.json({
      token,
      doctor,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const doctor = await Doctor.findOne({ email });


    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "kishor.repo@gmail.com",
        pass: "tzhptevphaysqgie",
      },
    });

    const otp = generateOTP();

    // Send OTP by email
    const mailOptions = {
      from: "kishor.repo@gmail.com",
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is: ${otp}`,
    };

    transporter.sendMail(mailOptions, async (error) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ error: "Failed to send OTP" });
      }

      // Save OTP in the database
      doctor.otp = otp;
      await doctor.save({ otp });

      res.json({ message: "OTP sent successfully", doctor });
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: "Failed to send OTP" });
  }
};

export const resetPasswordOTP = async (req, res) => {
  try {
    const { email, otp, password } = req.body;
    const doctor = await Doctor.findOne({ email });

    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }

    if (doctor.otp === otp) {
      doctor.verified = true;
      const hashedPassword = await hashPassword(password);
      Doctor.findOneAndUpdate(
        {
          email,
        },
        {
          otp: "",
        }
      ).exec();
      const webdoctor = WebDoctor.findOneAndUpdate(
        {
          email,
        },
        {
          password: hashedPassword,
        }
      ).exec();

      // const data = WebDoctor.find();

      res.json({ message: "Password  Changed successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  } catch (err) {
    console.error("Error verifying OTP:", err);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

export const registerWebPatience = async (req, res) => {
  const {
    firstName,
    lastName,
    pat_id,
    email,
    city,
    gender,
    age,
    notes,
    address,
    reportcategory,
  } = req.body.patientValues;

  const phone = req.body.patientValues.mobileNumber;

  const reportSubcategory= req.body.testInfoValues.tests.map((test)=>test._id)
   console.log("reportSubcategory",reportSubcategory)
    const {
    sample,
    pickupTime,
    hospitalName,
  } = req.body.testInfoValues;

  const {paymentMethod} = req.body.paymentInfo;


  try {
    const decoded = jwt.verify(req.headers.authtoken, config.JWT_SECRET_KEY);
    const doctorId = decoded._id
    const Doctor = await WebDoctor.findById(doctorId)
    const patientsExists = await HospitalPatient.findOne({ phone: phone });

    if (patientsExists) {
      return res.json({ errors: "Patient already exists" });
    } else {
      const patients = await new HospitalPatient({
        firstName,
        lastName,
        pat_id,
        email,
        city,
        gender,
        age,
        phone,
        notes,
        address,
        reportcategory,
        reportSubcategory:reportSubcategory,
        sample,
        pickupTime,
        hospitalName,
        amount:req.body.amount,
        paymentMethod,
        patienceDoctor:Doctor
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


export const searchWebPatience = async (req, res) => {

  
  try {
    let patients = await HospitalPatient.find({
      $or: [
        { firstName: { $regex: req.params.searchkey } },
        { city: { $regex: req.params.searchkey } },
        { phone: { $regex: req.params.searchkey } },
      ],
    });

    res.json({ patients });
  } catch (error) {
    console.error("Fetching API Error:", error);
    res.status(500).json({ error: "Failed to fetch patients" });
  }
};


export const listWebPatience = async (req, res) => {
  const decoded = jwt.verify(req.headers.authtoken, config.JWT_SECRET_KEY);
  const doctorId = decoded._id
  const Doctor = await WebDoctor.findById(doctorId)
  try {
    const patients = await HospitalPatient.find().populate("reportCategory").populate("reportSubcategory")
    return res.json({
      patients,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};


export const listSingleWebPatience = async (req, res) => {
  try {
    const id = req.params.id;

    const WebPatience = await HospitalPatient.findOne({_id:id}).populate("reportCategory").populate("reportSubcategory")
    return res.json({
      WebPatience,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};
