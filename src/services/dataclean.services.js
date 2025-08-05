
const userDataClean = (data) => {
    const clenData = {
        fullName : data.fullName.trim(),
        email : data.email.trim().toLowerCase(),
        password : data.password.trim()
    }
    return clenData;
}

export {userDataClean}