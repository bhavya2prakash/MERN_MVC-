const mongoose = require("mongoose");
const schema ={
    name:{
        type:String,
        trim:true,
        required:[true,'Name is required'],
        match:[/^[a-zA-Z\s]{1,}$/,'Please enter a valid Name']
    },
    email:{
        type:String,
        trim:true,
        required:[true,'Email Id is required'],
        unique:[true],
        match:[/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/,'Please enter a valid Email Id']
    },
    password:{
        type:String,
        // trim:true,
        // required:[true,' Password is required'],
        // match:[/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,'Password must contain minimum eight characters, at least one letter, one number and one special character']
    }
}


const monmodel = mongoose.model('Users',schema);
module.exports = monmodel;