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

        // Get file extension
    const ext = file.fileName.split('.').pop().toLowerCase();

    // Map known extensions to content types
    const contentTypes = {
        txt: "text/plain",
        py: "text/plain",
        java: "text/plain",
        js: "text/javascript",
        json: "application/json",
        md: "text/markdown",
        html: "text/html",
        css: "text/css",
        csv: "text/csv",
        pdf: "application/pdf",
        jpg: "image/jpeg",
        jpeg: "image/jpeg",
        png: "image/png",
        gif: "image/gif",
        webp: "image/webp"
    };

    const contentType = contentTypes[ext] || response.headers['content-type'] || 'application/octet-stream';

// Set headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Disposition', `inline; filename="${file.fileName}"`);


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