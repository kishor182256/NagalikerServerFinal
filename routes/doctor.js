import express from "express";
const router = express.Router();

import { doctorLoggedIn, requireSignIn } from "../middleware/requireSignIn.js";

import {
  deleteDoctor,
  doctorLogin,
  editDoctor,
  getSingleDoctor,
  getdoctorList,
  listSingleWebPatience,
  listWebPatience,
  registerDoctor,
  registerWebDoctor,
  registerWebPatience,
  resetPassword,
  resetPasswordOTP,
  searchWebPatience,
  verifyOtp,
} from "../controllers/doctor/doctor.js";

router.post("/register-doctor", requireSignIn, registerDoctor);
router.get("/getdoctorlist", requireSignIn, getdoctorList);
router.get("/getdoctor/:id", requireSignIn, getSingleDoctor);

router.put("/edit-doctor/:id", requireSignIn, editDoctor);
router.delete("/delete-doctor/:id", requireSignIn, deleteDoctor);


// Web Doctor Routes

router.post("/register-web-doctor", registerWebDoctor);
router.post("/verify-web-doctorotp", verifyOtp);
router.post("/web-doctor-login", doctorLogin);
router.post("/web-doctor-resetpasswordotp", resetPassword);
router.put("/web-doctor-resetpassword",resetPasswordOTP);


router.post("/register-web-patience",doctorLoggedIn, registerWebPatience);
router.get("/search-web-patience/:searchkey",doctorLoggedIn, searchWebPatience);
router.get("/get-web-patience",doctorLoggedIn, listWebPatience);
router.get("/get-web-patience/:id", listSingleWebPatience);





export default router;
