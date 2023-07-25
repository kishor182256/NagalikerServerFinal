import express from "express";
const router = express.Router();

import { requireSignIn } from "../middleware/requireSignIn.js";
import { addNewSample, deleteSample, editSample, getAllSample, getsingleSample } from "../controllers/sample/sample.js";


router.post("/addnewsample", requireSignIn, addNewSample);
router.delete("/deletesample/:id", requireSignIn, deleteSample);
router.put("/editsample/:id", requireSignIn, editSample);
router.get("/getsampledetails/:page/:limit", requireSignIn, getAllSample);
router.get("/getaccountdetails/:id", requireSignIn, getsingleSample);
router.get("/getsample/:id", requireSignIn, getsingleSample);








export default router;
