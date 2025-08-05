import User from '../models/users.model.js';
import { validateUser } from '../validator/user.validator.js';
import { userDataClean } from '../services/dataclean.services.js';
import { createToken } from '../services/token.services.js';


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
            maxAge : 20*24*60*60*100,
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

export {createNewUser}