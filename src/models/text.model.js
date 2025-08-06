import mongoose from "mongoose";

const Schema = mongoose.Schema;

const textSchema = new Schema({
    uniqueCode : {
        type:String,
        required:true
    }
})