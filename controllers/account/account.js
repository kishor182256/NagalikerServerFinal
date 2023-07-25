import Account from "../../model/account/account.js";
import bwipjs  from 'bwip-js';
import fs from "fs";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


export const addNewAccount = async (req, res) => {
  const {
    name,
    phone,
    email,
    prefix,
    address,
    keyperson,
    place,
    computername,
  } = req.body;

  try {
    const account = new Account({
      name,
      phone,
      email,
      prefix,
      address,
      keyperson,
      place,
      computername,
    });
    const existingAccount = await Account.findOne({ email });
    if (existingAccount) {
      return res
        .status(400)
        .json({ message: "Account with the same email already exists" });
    } else {
      const savedAccount = await account.save();
      res.status(201).json({ message: "Account category saved", savedAccount });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in saving Category" });
  }
};

export const getAllAccount = async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 10;
      const searchTerm = req.params.search || '';
  
      const count = await Account.countDocuments({
        $or: [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      });
  
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;
  
      const accountDetails = await Account.find({
        $or: [
          { firstName: { $regex: searchTerm, $options: 'i' } },
          { lastName: { $regex: searchTerm, $options: 'i' } },
          { email: { $regex: searchTerm, $options: 'i' } }
        ]
      }).skip(offset).limit(limit);
  
      return res.json({
        accountDetails,
        totalPages,
        currentPage: page,
        totalItems: count,
      });
    } catch (err) {
      console.error("Fetching API Error", err);
      res.json({ error: err });
    }
  };
  

export const deleteAccount = async (req, res) => {
  try {
    const account = req.params.id;
    console.log("deleteaccount",req.params.id);
    const delltedAccount = await Account.deleteOne({ _id: account });
    return res.json({
      message: "Account  removed successfully",
      delltedAccount
    });
  } catch (err) {
    console.error("Deleting  Api Error", err);
    res.json({ error: err });
  }
};

export const editAccount = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedAccount = await Account.findOneAndUpdate({ _id:id }, req.body, {
      new: true,
    }).exec();
    return res.json({message:"Account updated successfully",
      updatedAccount,
    });
  } catch (err) {
    console.error("updatedAccount  Api Error", err);
    res.json({ error: err });
  }
};


export const getsingleAccount = async (req, res) => {
    try {
      const account = req.params.id;
  
      const singleaccount = await Account.findOne({_id: account});
      return res.json({
        singleaccount,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };

  export const getBarcode = async (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    
    try {
      const { firstname, lastname, age, labrefno } = req.body;
      const text = `${firstname} ${lastname}\nAge: ${age}\nLab Ref: ${labrefno}`;
  
      bwipjs.toBuffer(
        {
          bcid: 'code128',
          text: text,
          scale: 3,
          height: 10,
          includetext: true,
          textxalign: 'center',
        },
        (err, png) => {
          if (err) {
            console.error('Error generating barcode:', err);
            return res.status(500).send('Error generating barcode');
          }
  
          const filePath = `${__dirname}/barcode.png`;
          fs.writeFileSync(filePath, png);
          
          res.set({
            'Content-Type': 'image/png',
            'Content-Disposition': 'attachment; filename="barcode.png"',
          });
          
  
          // Send the barcode image as a file download
          res.sendFile(filePath, (err) => {
            // Remove the temporary file
            fs.unlinkSync(filePath);
            if (err) {
              console.error('Error downloading barcode:', err);
            }
          });
        }
      );
    } catch (e) {
      console.error("Error generating barcode:", e);
      res.status(500).send("Error generating barcode");
    }
  };
