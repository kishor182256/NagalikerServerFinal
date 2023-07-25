import express from "express";
const router = express.Router();

import {
  deleteCollector,
  editCollector,
  getcollectorList,
  getsinglecollector,
  registerCollector,
} from "../controllers/collector/collector.js";
import { requireSignIn } from "../middleware/requireSignIn.js";

router.post("/register-collector", requireSignIn, registerCollector);
router.get("/getcollectorlist", requireSignIn, getcollectorList);
router.get("/getsinglecollector/:id", requireSignIn, getsinglecollector);
router.put("/edit-collector/:id", requireSignIn, editCollector);
router.delete("/delete-collector/:id", requireSignIn, deleteCollector);

export default router;
