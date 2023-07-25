import jwt from 'jsonwebtoken';
import * as config from '../config.js'
import Admin from "../model/admin.js";
import WebDoctor from "../model/doctor/doctorWeb.js";



export const requireSignIn = async(req, res,next) => {
    try {
      
        const decoded = jwt.verify(req.headers.authtoken, config.JWT_SECRET_KEY);
        // console.log('requireSignIn---->', decoded)
        const isAdmin = await Admin.findById(decoded)
        // console.log('requireSignIn---->', isAdmin.role)
        
          req.user = decoded; 
          next();
       
      } catch (err) {
        console.log(err);
        res.status(401).json({ error: "Invalid or expired token" });
      }
}


export const isAdmin = async(req, res,next) => {
  try {
      const decoded = jwt.verify(req.headers.authtoken, config.JWT_SECRET_KEY);
      // console.log('requireSignIn---->', decoded)
      const isAdmin = await Admin.findById(decoded)
      // console.log('requireSignIn---->', isAdmin.role)
      if(isAdmin.role==='admin'){
        req.user = decoded; 
        next();
      }else{
        res.status(200).json({ error: "You are not authorised to access this page" })
      }  
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid or expired token" });
    }
}



export const doctorLoggedIn = async(req, res,next) => {
  try {
    
      const decoded = jwt.verify(req.headers.authtoken, config.JWT_SECRET_KEY);
      const doctorId = decoded._id
      const IsDoctor = await WebDoctor.findById(doctorId)
      if(IsDoctor){
        req.user = decoded; 
        next();
      }else{
        res.status(200).json({ error: "You are not authorised to access this page" })
      }  
    } catch (err) {
      console.log(err);
      res.status(401).json({ error: "Invalid or expired token" });
    }
}