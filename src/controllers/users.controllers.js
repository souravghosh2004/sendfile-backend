import User from '../models/users.model.js';
import { validateUser } from '../validator/user.validator.js';
import { userDataClean } from '../services/dataclean.services.js';
import { createToken } from '../services/token.services.js';
import bcrypt from "bcrypt";
import { NODE_ENV } from '../config/env.confing.js';


const createNewUser = async (req, res) => {
   
    try {
        const validCheck = validateUser(req.body);
        if(!validCheck.success){
            return res.status(400).json(validCheck);
        }
        const userData = userDataClean(req.body);

        const checkUser = await User.find({email:userData.email})
        if(checkUser.length>0){
            return res.status(409).json({success:false, message:"User already exists.", data:null})
        }
        
        const newUser = await User.create(userData)
        if(!newUser){
            return res.status(500).json({success:false, message:"Faild to craete new user.", data:null});
        }
        const token = createToken({fullName:newUser.fullName,userId:newUser._id});

        res.cookie("auth_token",token, {
            httpOnly : true,
            samesite : "strict",
            maxAge : 20*24*60*60*1000,
            secure:true
        })

        return res.status(201).json(
            {success:true, message:"User created successfully.",
            data:{fullName:newUser.fullName,userId:newUser._id}}
        );

    } catch (err) {
        console.log("Faild to create user ",err)
        return res.status(500).json({ success: false, message: "Server error. Please try again later." });
    }  
   
}


const loginUser = async (req, res) => {
    
    try {
        let {email,password} = req.body;

        if(!email){
            return res.status(400).json({success:false, message:"Email is required.", data:null});
        }
        if(!password){
            return res.status(400).json({success:false, message:"Password ids required.", data:null});
        }
        email = email.trim().toLowerCase();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if(!emailRegex.test(email)){
            return res.status(400).json({success:false, message:"Enter valid email.", data:null});
        }

        password = password.trim();

        if(!password || password.length < 6){
            return res.status(400).json({success:false, message:"Password must be length 6.", data:null});

        }

        const user = await User.findOne({email});

        if (!user){
            return res.status(404).json({success:false, message:"User not found.", data:null})
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(401).json({success:false, message:"Invalid password.", data:null});
        }

        const token = createToken({fullName:user.fullName,userId:user._id});
        if(!token){
            return res.status(500).json({success:false, message:"Internal server error. Please try later.", data:null});
        }

        res.cookie("auth_token",token, {
            httpOnly:true,
            samesite:"strict",
            maxAge: 20*24*60*60*1000,
            secure:NODE_ENV == "production"
        })

        res.status(200).json({success:true, message:"Login successful.", data:{fullName:user.fullName, userId:user._id}});

    } catch (err) {
        console.log("Login error : ",err);
        res.status(500).json({success:false, message:"Failed to login. Internal server error.", data:null});

    }


}

export {createNewUser, loginUser}