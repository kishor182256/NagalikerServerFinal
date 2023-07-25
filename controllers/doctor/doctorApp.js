import { comparePassword, hashPassword } from "../helper/paswordEncrypt.js";
import Admin from "../model/admin.js";
import User from "../model/user/registerUser.js";

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
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ error: "Please register first" });
    }
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
    res.json({
      token,
      admin,
    });
  } catch (err) {
    console.log(err);
    res.json({ error: "Something went wrong. Try again." });
  }
};

export const logout = (req, res) => {};

export const registerUser = async (req, res) => {
  const { name, phone, email, auditlockdays, status } = req.body;

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.json({ errors: "Doctor already Registered" });
    } else {
      const user = await new User({
        name,
        auditlockdays,
        phone,
        email,
        status,
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

    const singleuser = await User.findOne(user);
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
    const updatedUser = await User.findOneAndUpdate({ user }, req.body, {
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
  const { reportId, reportName, reportTat } = req.body;
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
        sample,
        reportcategory,
      }).save();

      return res.json({
        reportFormatGroup,
      });
    }
  } catch (err) {
    console.error("ReportFormatGroup Api Error", err);
    res.json({ error: err });
  }
};
