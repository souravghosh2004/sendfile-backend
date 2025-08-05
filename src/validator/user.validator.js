const validateUser = (data) => {
    if(!data.fullName || typeof data.fullName !== "string" || !data.fullName.trim()){
        return {success:false,message:"Fullname is reqired.",data:null};
    }

    if(!data.email || typeof data.email !== "string" || !data.email.trim()){
        return {success:false, message:"Email is reqired.", data:null};
    }

    if(!data.password || typeof data.password != "string" || data.password.trim().length < 4){
        return {success:false, message:"Password is reqired with minimum 4 length", data:null};
    }
   
    if(data.password.trim().includes(" ")){
        return {success:false, message:"No spaces allowed in paaword. ", data:null};
    }  

    return {success: true, message:"User data is valid. Next data clean", data};
}

export {validateUser}