import mongoose from "mongoose";

const Schema = mongoose.Schema;

const textSchema = new Schema({
    uniqueCode : {
        type:String,
        required:true
    },
    content : {
        type : String,
        required : true
    },
    owner : {
        type : mongoose.Schema.ObjectId,
        ref :"User"
    }
},{timestamps:true});


const Text = mongoose.model("Text",textSchema);

export default Text;