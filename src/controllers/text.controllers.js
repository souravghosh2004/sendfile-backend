import mongoose from "mongoose";
import Text from "../models/text.model.js";
import generateCode from "../services/generateCode.services.js";
import { verifyToken } from "../services/token.services.js";
const storeText = async (req,res) => {
    
    try {
        const {content} = req.body;
            console.log("content = ",content)
        if (!content){
            return res.status(400).json({success:false,message:"Content is required.",data:null})
        }

        if(content.trim().length<1){
            return res.status(400).json({success:false,message:"Content is required.",data:null})
        }

        let existingCode = await Text.find().distinct("uniqueCode");

        let allUniqueCodes = new Set(existingCode);

        let uniqueCode = "";

        do{
            uniqueCode = generateCode();
        }while(allUniqueCodes.has(uniqueCode));

        let owner = null;

        let token = req?.cookies?.auth_token || null
        if(token){
            try {
                const decode = verifyToken(token)
                if(decode && decode._id){
                    owner = decode._id
                }
            } catch (err) {
               console.warn("Invalid token:", err.message) 
            }
        }

        const response = await Text.create({uniqueCode,content,owner})

        if (!response){
            return res.status(500).json({success:false, message:"Please try later.", data:null});
        }

        res.status(201).json({success:true,message:"Text store successfully now you can use it.",data:{uniqueCode}})

    } catch (error) {
        res.status(500).json({success:false, message:"Something went wrong. Please try later.", data:null});
        console.log(error)
    }
}


const fetchText = async (req, res) => {
    
    try {
       const {uniqueCode} = req.params;
        if(!uniqueCode){
            return  res.status(400).json({success:false, message:"Uniquecode is required.", data:null})
        }

        if(uniqueCode.length<6){
            return  res.status(400).json({success:false, message:"Uniquecode must be 6 digit.", data:null})
        }

        const details = await Text.findOne({uniqueCode});

        if(!details){
            return res.status(404).json({success:false, message:"Invaild code. Data not found",data:null})
        }

        res.status(200).json({success:true, message:"Data fetch successfully.",data:details});


    } catch (err) {
        console.warn("Faild to text fetch. ", err?.message)
        res.status(500).json({success:false, message:"Internel server error. Please try later.", data:null});
    }

}

export {storeText, fetchText}