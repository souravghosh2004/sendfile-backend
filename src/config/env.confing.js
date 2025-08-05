import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME


export {PORT,MONGODB_URI,DB_NAME}


// CLOUDINARY ENVIORNMENT
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOD_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;

export {CLOUDINARY_CLOUD_NAME,CLOUDINARY_API_KEY,CLOUDINARY_API_SECRET}

// JWT ENVIORNMENT
const JWT_SECRET = process.env.JWT_SECRET;
export {JWT_SECRET};
