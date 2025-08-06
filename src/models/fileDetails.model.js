import mongoose from "mongoose";

const Schema = mongoose.Schema;

const fileDetailsSchema = new Schema({
    uniqueCode : {
        type : String,
        uppercase: true,
        unique : true
    },
    owner : {
        type : mongoose.Types.ObjectId,
        ref : "User"
    },
   
    urls : [{
        url:{type:String},
        fileName:{type:String},
        pubicId : {type:String},
    }]
},{timestamps : true});

const FileDetails = mongoose.model("FileDetails",fileDetailsSchema);

export default FileDetails;