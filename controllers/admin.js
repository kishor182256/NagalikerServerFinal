import { comparePassword, hashPassword } from "../helper/paswordEncrypt.js";
import Admin from "../model/admin.js";
import User from "../model/user/registerUser.js";
import Appointment from "../model/patients/bookVisit.js";

import jwt from "jsonwebtoken";
import * as config from "../config.js";
import ReportFormat from "../model/reportFormat/reportFormat.js";

export const register = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExists = await Admin.findOne({ email: email });

    if (userExists) {
      return res.json({ errors: "User already exists" });
    } else {
      const hashedPassword = await hashPassword(password);

      const admin = await new Admin({
        password: hashedPassword,
        email,
      }).save();

      return res.json({
        admin,
      });
    }
  } catch (err) {
    console.error("Register Api Error", err);
    res.json({ error: err });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return;

    const admin = await Admin.findOne({ email });
    if (admin) {
      const match = await comparePassword(password, admin.password);
      if (!match) {
        return res.json({
          error: "Wrong password",
        });
      }
      const token = jwt.sign({ _id: admin._id }, config.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      admin.password = undefined;
      return res.json({
        token,
        admin,
      });
    }else{
      const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "Please register first" });
    }

    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.json({
        error: "Wrong password",
      });
    }

    const token = jwt.sign({ _id: user._id }, config.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    user.password = undefined;
    res.json({
      token,
      user,
    });
    }

    
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again." });
  }
};


export const logout = (req, res) => {};

export const registerUser = async (req, res) => {
  const { name, phone, email, auditlockdays, status,password } = req.body;

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.json({ errors: "Doctor already Registered" });
    } else {
      const hashedPassword = await hashPassword(password)
      const user = await new User({
        name,
        auditlockdays,
        phone,
        email,
        status,
        password:hashedPassword,
      }).save();

      return res.json({
        user,
      });
    }
  } catch (err) {
    console.error("Register Api Error", err);
    res.json({ error: err });
  }
};

export const getuserList = async (req, res) => {
  try {
    const users = await User.find();
    return res.json({
      users,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const getSingleUser = async (req, res) => {
  try {
    const user = req.params.id;

    const singleuser = await User.findOne({_id:user});
    return res.json({
      singleuser,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const getuser = async (req, res) => {
  try {
    const name = req.params.name;
    const users = await User.find({ name: name });
    console.log("Fecthing  Api for user", users);
    return res.json(users);
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = req.params.id;
    const deleteduser = await User.deleteOne({ _id: user });
    return res.json({
      message: "User removed successfully",
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};

export const editUser = async (req, res) => {
  try {
    const user = req.params.id;
    const updatedUser = await User.findOneAndUpdate({ _id:user }, req.body, {
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

export const addreportFormat = async (req, res) => {
  const { reportId, reportName, reportTat,reportshortName } = req.body;
  console.log("adding report", req.body);

  const reportcategory = req.body.category;
  const sample = req.body.status;

  try {
    const reportFormat = await ReportFormat.findOne({ reportId: reportId });

    if (reportFormat) {
      return res.json({ errors: "ReportFormat already exists" });
    } else {
      const reportFormatGroup = await new ReportFormat({
        reportId,
        reportName,
        reportTat,
        sample,reportshortName,
        reportcategory,
      }).save();

      return res.json({message:"Report Format saved",
        reportFormatGroup,
      });
    }
  } catch (err) {
    console.error("ReportFormatGroup Api Error", err);
    res.json({ error: err });
  }
};


export const bookpatienceVisit = async (req, res) => {
  const { patId, phone, date, time,
     patienceName,investigation,opetatorId,notes,
     address,city,visitby,amount } = req.body;

  try {
    const userExists = await Appointment.findOne({ phone: phone });

    if (userExists) {
      return res.json({ errors: "Patience already Registered" });
    } else {
      const newbooking = await new Appointment({
        patId, phone, date, time,
        patienceName,investigation,opetatorId,notes,
        address,city,visitby,amount,
      }).save();

      return res.json({
        newbooking,
      });
    }
  } catch (err) {
    console.error("Register Api Error", err);
    res.json({ error: err });
  }
};


export const patienceBookings = async (req, res) => {
  try {
    const bookingList = await Appointment.find();
    return res.json({
      bookingList,
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};


export const deletepatienceBookings = async (req, res) => {
  try {
    const user = req.params.id;
    const deleteduser = await Appointment.deleteOne({ _id: user });
    return res.json({
      message: "Booking removed successfully",
    });
  } catch (err) {
    console.error("Fecthing  Api Error", err);
    res.json({ error: err });
  }
};


export const editreportFormat = async(req, res) => {
  try {
    const id = req.params.id;
    const updatedReport = await ReportFormat.findOneAndUpdate({ _id:id }, req.body, {
      new: true,
    }).exec();
    return res.json({
      updatedReport,
    });
  } catch (err) {
    console.error("Update  Api Error", err);
    res.json({ error: err });
  }
}




