import FileDetails from "../models/fileDetails.model.js";
const detailsCodes = async (req, res) =>{
    
    try {
      const user = req.user;
      if (!user){
        return res.status(401).json({success:false, message:"Unauthorized user.", data:null});
      }
      const response = await FileDetails.find({owner:user.userId}).select("uniqueCode urls.fileName -_id");
      if(!response.length){
        return res.status(404).json({success:false, message:"No file found", data:null});
      }

      res.status(200).json({success:true, message:"Data fetch successfully.", data:response})
    } catch (err) {
      console.log("details codes fetch error = ",err);
      res.status(500).json({success:false, message:"Internal server error. Please try later.", data:null});
    }

}

export {detailsCodes};