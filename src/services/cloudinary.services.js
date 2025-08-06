import cloudinary from "../config/cloudinary.config.js";

/*
const uploadCloudinary = async (files) => {
  try {
    console.log("files = ",files)
    const uploadResults = await Promise.all(
      files.map(file =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { resource_type: "auto" },
            (err, uploadResult) => {
              if (err) {
                console.error("Cloudinary upload error:", err);
                return reject(err);
              }
              const url = uploadResult.secure_url;
              const fileName = file.originalname;
              const publicId = uploadResult.public_id;
              resolve({ url, fileName ,publicId});
            }
          );
          stream.end(file.buffer);
        })
      )
    );
    return { success: true, uploadResults };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, error: error.message };
  }
}
*/
const uploadCloudinary = async (files) => {
  try {
    const uploadResults = await Promise.all(
      files.map(file =>
        new Promise((resolve, reject) => {
          const ext = file.originalname.split('.').pop().toLowerCase();

          // Use 'raw' for non-image files (like .pdf, .txt, .java, etc.)
          const isRaw = !["jpg", "jpeg", "png", "gif", "bmp", "webp"].includes(ext);
          const resourceType = isRaw ? "raw" : "image";

          const stream = cloudinary.uploader.upload_stream(
            { resource_type: resourceType },
            (err, uploadResult) => {
              if (err) {
                console.error("Cloudinary upload error:", err);
                return reject(err);
              }
              const url = uploadResult.secure_url;
              const fileName = file.originalname;
              const publicId = uploadResult.public_id;
              resolve({ url, fileName, publicId });
            }
          );

          stream.end(file.buffer);
        })
      )
    );

    return { success: true, uploadResults };
  } catch (error) {
    console.error("Upload failed:", error);
    return { success: false, error: error.message };
  }
};


export default uploadCloudinary;



