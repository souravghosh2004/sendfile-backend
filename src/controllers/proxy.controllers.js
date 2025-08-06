import axios from "axios";
import FileDetails from "../models/fileDetails.model.js";


const proxyFile = async (req, res) => {

    try {
        const {fileId} = req.params;

        if(!fileId && fileId.stream().length < 1){
            return res.status(400).json({success:false,message:"Bad request. File ID is reqired."})
        }

        const filedetail = await FileDetails.findOne({"urls._id":fileId});
        if (!filedetail){
            return res.status(404).json({success:false,message:"File not found"});
        }

        const file = filedetail.urls.id(fileId)

        if(!file){
            return res.status(404).json({success:false, message: "File not found."})
        }

        const cloudinaryUrl = file.url;

        const response = await axios({
            method:"get",
            url:cloudinaryUrl,
            responseType:"stream"
        })

        res.setHeader('Content-Type',response.headers['content-type']);
        res.setHeader('Content-Disposition',`inline; filename="${file.fileName}"`)

        response.data.pipe(res)

    } catch (err) {
        console.log(err)
        res.status(500).json({success:false, message:"Internal server error Please try later"});
    }

}



const downloadFile = async (req, res) => {

    try {
        const {fileId} = req.params;

        if(!fileId && fileId.stream().length < 1){
            return res.status(400).json({success:false,message:"Bad request. File ID is reqired."})
        }

        const filedetail = await FileDetails.findOne({"urls._id":fileId});
        if (!filedetail){
            return res.status(404).json({success:false,message:"File not found"});
        }

        const file = filedetail.urls.id(fileId)

        if(!file){
            return res.status(404).json({success:false, message: "File not found."})
        }

        const cloudinaryUrl = file.url;

        const response = await axios({
            method:"get",
            url:cloudinaryUrl,
            responseType:"stream"
        })

        res.setHeader('Content-Type',response.headers['content-type']);
        res.setHeader('Content-Disposition',`attachment; filename="${file.fileName}"`)

        response.data.pipe(res)

    } catch (err) {
        console.log(err)
        res.status(500).json({success:false, message:"Internal server error Please try later"});
    }

}


export {proxyFile,downloadFile}