import Collector from "../../model/collector/collector.js";



export const registerCollector = async (req, res) => {
    const { name, phone, email, location, status } = req.body;
  
    try {
      const userExists = await Collector.findOne({ email: email });
  
      if (userExists) {
        return res.json({ errors: "Collector already Registered" });
      } else {
        const collector = await new Collector({
          name,
          location,
          phone,
          email,
          status,
        }).save();
  
        return res.json({
          collector,
        });
      }
    } catch (err) {
      console.error("Register Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const getcollectorList = async (req, res) => {
    try {
      const collector = await Collector.find().populate("patience");
      return res.json({
        collector,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const getsinglecollector = async (req, res) => {
    try {
      const collector = req.params.id;
  
      const singlecollector = await Collector.findOne({_id:collector});
      return res.json({
        singlecollector,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const deleteCollector = async (req, res) => {
    try {
      const collector = req.params.id;
      const collectors = await Collector.deleteOne({ _id: collector });
      return res.json({
        message: "Collector removed successfully",
      });
    } catch (err) {
      console.error("Deleting collector  Api Error", err);
      res.json({ error: err });
    }
  };
  
  export const editCollector = async (req, res) => {
    try {
      const collector = req.params.id;
      const updatedCollector = await Collector.findOneAndUpdate(
        { _id:collector },
        req.body,
        { new: true }
      ).exec();
      return res.json({
        updatedCollector,
      });
    } catch (err) {
      console.error("Updating collector  Api Error", err);
      res.json({ error: err });
    }
  };
  