// uploadFiles controller
import FileDetails from "../models/fileDetails.model.js";
import uploadCloudinary from "../services/cloudinary.services.js";
import generateCode from "../services/generateCode.services.js";
import { verifyToken } from "../services/token.services.js";

const uploadFiles = async (req, res) => {
  try {
    const totalSize = req.files.reduce((sum, file) => sum + file.size, 0);

    // 2️⃣ Check limit: 50 MB
    const maxSize = 50 * 1024 * 1024; // 50 MB in bytes
    if (totalSize > maxSize) {
      return res.status(400).json({
        success: false,
        message: "Total file size exceeds 50 MB limit",
        data: null
      });
    }
    const result = await uploadCloudinary(req.files);
    if (!result.success) {
      return res.status(500).json({ success:false, message:"File uploads failed, please try later.", data:null });
    }
    if (result.uploadResults.length === 0) {
      return res.status(400).json({ success:false, message:"File is required", data:null });
    }

    // get unique code
    const allUniqueCodes = await FileDetails.find().select('uniqueCode -_id');
    const uniqueCodeSet = new Set(allUniqueCodes.map(item => item.uniqueCode));
    let uniqueCode = "";
    do {
      uniqueCode = generateCode();
    } while (uniqueCodeSet.has(uniqueCode));

    // get owner from token
    let owner = null;
    const token = req.cookies?.auth_token || null;
    if(token){
      const decode = verifyToken(token);
      console.log("decode token = ",decode)
      if(decode){
        owner = decode.userId; // or decode.userId
      }
    }

    // save to DB
    const details = await FileDetails.create({
      uniqueCode,
      owner,
      urls: result.uploadResults
    });

    if(!details){
      return res.status(500).json({ success:false, message:"File upload failed", data:null });
    }

    return res.status(200).json({
      success:true,
      message:"File uploaded successfully",
      data: {
        uniqueCode: details.uniqueCode,
        urls: details.urls
      }
    });
  } catch (err) {
    console.error("Failed to upload file", err);
    return res.status(500).json({ success:false, message:"File upload failed", data:null });
  }
}

export default uploadFiles;


const getFiles = async (req, res) => {
  try {
    let { uniqueCode } = req.params;
    if (!uniqueCode) {
      return res.status(400).json({
        success: false,
        message: "Unique code is required",
        data: null,
      });
    }

    const details = await FileDetails.findOne({ uniqueCode });

    if (!details) {
      return res.status(404).json({
        success: false,
        message: "Invalid unique code. File not found.",
        data: null,
      });
    }

    const filesData = details.urls.map(fileObject => ({
      fileName : fileObject.fileName,
      previewUrl:`https://sendfile-backend.onrender.com/api/v1/file-manager/fetch/files/${fileObject._id}/${fileObject.fileName}`,
      downloadUrl:`https://sendfile-backend.onrender.com/api/v1/file-manager/download/files/${fileObject._id}/${fileObject.fileName}`
    }))

    return res.status(200).json({
      success: true,
      message: "File details fetched successfully",
      data: filesData,
    });

  } catch (err) {
    console.error("Error in getFiles:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      data: null,
    });
  }
};


export {getFiles};






