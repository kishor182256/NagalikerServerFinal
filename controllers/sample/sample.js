import Sample from "../../model/sample/sample.js";

export const addNewSample = async (req, res) => {
  const {
    sampleFromname,
    phone,
    sampleId,
    status,
    sampleby,
  } = req.body;

  try {
    const sample = new Sample({
        sampleFromname,
        phone,
        sampleId,
        status,
        sampleby,
    });
    const existingSample= await Sample.findOne({ phone });
    if (existingSample) {
      return res
        .status(400)
        .json({ message: "Sample with the same phone already exists" });
    } else {
      const savedSample = await sample.save();
      res.status(201).json({ message: "Sample category saved", savedSample });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in saving Category" });
  }
};

export const getAllSample = async (req, res) => {
    try {
      const page = parseInt(req.params.page) || 1;
      const limit = parseInt(req.params.limit) || 10;
      const searchTerm = req.params.search || '';
  
      const count = await Sample.countDocuments({
        $or: [
          { sampleFromname: { $regex: searchTerm, $options: 'i' } },
        //   { phone: { $regex: Number(searchTerm), $options: 'i' } },
        ]
      });
  
      const totalPages = Math.ceil(count / limit);
      const offset = (page - 1) * limit;
  
      const sampleDetails = await Sample.find({
        $or: [
          { sampleFromname: { $regex: searchTerm, $options: 'i' } },
        //   { phone: { $regex: Number(searchTerm), $options: 'i' } },
        ]
      }).skip(offset).limit(limit);
  
      return res.json({
        sampleDetails,
        totalPages,
        currentPage: page,
        totalItems: count,
      });
    } catch (err) {
      console.error("Fetching API Error", err);
      res.json({ error: err });
    }
  };
  

export const deleteSample = async (req, res) => {
  try {
    const sample = req.params.id;
    await Sample.deleteOne({ _id: req.params.id });
    return res.json({
      message: "Sample removed successfully",
    });
  } catch (err) {
    console.error("Deleting  Api Error", err);
    res.json({ error: err });
  }
};

export const editSample = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedSample = await Sample.findOneAndUpdate({ _id:id }, req.body, {
      new: true,
    }).exec();
    return res.json({message:"Sample updated successfully",
    updatedSample,
    });
  } catch (err) {
    console.error("Sample Update  Api Error", err);
    res.json({ error: err });
  }
};


export const getsingleSample = async (req, res) => {
    try {
      const sample = req.params.id;
  
      const singlesample = await Sample.findOne({_id:sample});
      return res.json({
        singlesample,
      });
    } catch (err) {
      console.error("Fecthing  Api Error", err);
      res.json({ error: err });
    }
  };
