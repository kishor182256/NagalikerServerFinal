import express from "express";
const router = express.Router();

import {
  login,
  register,
  getuserList,
  registerUser,
  editUser,
  deleteUser,
  logout,
  getuser,
  addreportFormat,
  getSingleUser,
  bookpatienceVisit,
  patienceBookings,
  deletepatienceBookings,
  editreportFormat,
} from "../controllers/admin.js";

import { requireSignIn } from "../middleware/requireSignIn.js";
import {
  assigncollection,
  deletePatience,
  deletePatienceCard,
  deleteReportFormat,
  editCollection,
  editPatienceCard,
  editPatienceReport,
  getAllpatienceList,
  getPatienceById,
  getPatienceCard,
  getPatientsBySubcategory,
  getReportFormat,
  getSinglePatience,
  getSinglePatienceCard,
  getpatienceList,
  registerPatience,
  registerPatienceCard,
  singleReportFormat,
  updatePatientReport,
} from "../controllers/patience/patience.js";

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);

router.post("/addreportformat", requireSignIn, addreportFormat);
router.put("/editreportformat/:id", requireSignIn, editreportFormat);
router.get("/getreportformat/:page/:limit", requireSignIn, getReportFormat);
router.delete("/deletereportformat/:id", requireSignIn, deleteReportFormat);
router.get("/getreportformat/:id", requireSignIn, singleReportFormat);



router.post("/register-patience", requireSignIn, registerPatience);
router.get("/getpatiencelist/:page/:limit", requireSignIn, getpatienceList);
router.delete("/delete-patience/:id", requireSignIn, deletePatience);
router.put("/edit-patience/:id", requireSignIn, editPatienceReport);
router.get("/get-patience/:phone", requireSignIn, getSinglePatience);
router.get("/get-single-patience/:id", getPatienceById);
router.get("/getpatiencelist",getAllpatienceList);

router.get("/get-patientby-subcategory/:id/:phone", requireSignIn, getPatientsBySubcategory);
router.post("/update-patient-report", requireSignIn, updatePatientReport);
router.put("/edit-collection", requireSignIn, editCollection);



+


router.post("/register-patience-card", requireSignIn, registerPatienceCard);
router.get("/get-patience-card", requireSignIn, getPatienceCard);
router.get("/get-patience-card/:id", requireSignIn, getSinglePatienceCard);
router.post("/edit-patience-card/:id", requireSignIn, editPatienceCard);
router.delete("/delete-patience-card/:id", requireSignIn, deletePatienceCard);






router.post("/assigncollection", requireSignIn, assigncollection);


router.post("/register-user", requireSignIn, registerUser);
router.get("/getuserlist", requireSignIn, getuserList);
router.get("/getuserlist/:id", requireSignIn, getSingleUser);

router.get("/searchuserlist/:name", requireSignIn, getuser);
router.put("/edit-user/:id", requireSignIn, editUser);
router.delete("/delete-user/:id", requireSignIn, deleteUser);

router.post("/book-patience-visit", requireSignIn, bookpatienceVisit);
router.get("/get-booking-list", requireSignIn, patienceBookings);
router.delete("/delete-booking-list/:id", requireSignIn, deletepatienceBookings);

export default router;
