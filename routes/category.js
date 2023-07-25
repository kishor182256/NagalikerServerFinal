import express from "express";
const router = express.Router();

import { requireSignIn } from "../middleware/requireSignIn.js";
import {
  addCategory,
  addSubCategory,
  addSubCategoryPrice,
  deleteTestCategory,
  deleteTestSubCategory,
  editSubCategoryPrice,
  editTestCategory,
  editTestSubCategory,
  getAllCategory,
  getAllTestCategory,
  getAllsubCategory,
  getCategory,
  getSingleSubCategory,
  getsubCategory,
} from "../controllers/category/category.js";

router.post("/addtestcategory", requireSignIn, addCategory);
router.get("/gettestcategory", requireSignIn, getAllTestCategory);
router.get("/gettestcategory/:id", requireSignIn, getCategory);
router.get("/gettestcategory/:page/:limit", requireSignIn, getAllCategory);
router.post("/addtestsubcategory", requireSignIn, addSubCategory);
router.put("/addtestcategoryprice", requireSignIn, addSubCategoryPrice);
router.get("/gettestsubcategory/:id", requireSignIn, getSingleSubCategory);
router.put("/edittestcategoryprice/:id", requireSignIn, editSubCategoryPrice);

router.get("/gettestsubcategory/:page/:limit", requireSignIn, getsubCategory);
router.get("/gettestsubcategorys", getAllsubCategory);
router.get("/gettestsubcategory",requireSignIn, getAllsubCategory);

router.delete("/deletetestcategory/:id", requireSignIn, deleteTestCategory);
router.put("/edittestcategory/:id", requireSignIn, editTestCategory);
router.delete('/deletetestsubcategory/:id',requireSignIn,deleteTestSubCategory);
router.put('/edittestsubcategory/:id',requireSignIn,editTestSubCategory);
// router.get('/gettestsubcategory/:id',requireSignIn,getTestSubCategory);

export default router;
