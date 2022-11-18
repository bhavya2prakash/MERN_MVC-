const bcrypt = require('bcrypt');
const monmodel = require("../models/model");
const service = require("../services/service");
 const CreateUser=async(req,res)=>{
    console.log("inside post function");
    if(!validatePassword(req.body.password)){
      res.status(500).json({message: "Password must contain minimum eight characters, at least one letter, one number and one special character"});
      return;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password,10);
    const data = new monmodel({
      name:req.body.name,
      email:req.body.email,
      password:hashedPassword
    });
    
    data.save((err, monmodel) => {
      if (err) {  
        res.status(500).json({message: (err.name=="MongoServerError")? 'This Email Id already exists' : err.message});
        return;
      } 
      else {  
      res.status(200).send({message: "New user successfully created" })
      }
    });
  //   const val = await data.save();
  //   res.send("New user successfully created");
  }
   const GetAllUser=(req,res)=>{
    const userList = service.QuerlistofUsers(res);
    
    
  }
   const UpdateUser=async(req,res)=>{
    let updateEmail = req.body.email;
    let updateName = req.body.name;
    if(!validatePassword(req.body.password)){
        res.status(500).json({message: "Password must contain minimum eight characters, at least one letter, one number and one special character"});
        return;
    }
    const hashedPassword = await bcrypt.hash(req.body.password,10);
    let updatePassword = hashedPassword;
    monmodel.findOneAndUpdate({email:updateEmail},{$set:{name:updateName,password:updatePassword}},{new:true},(err,data)=>
    {
        if(err){
            res.send(err);
            return;
        }
        else{
            
            if(data==null){
                res.send({ message: "No user with this email id exists"});
            }
            
            else{
                data.save((err, monmodel) => {
                    if (err) {
  
                      res.status(500).send({message: err.message});
                      return;
                    } 
                    else res.status(200).send({ message: "User successfully updated"})
                  });

            }
        }
    })
}
 const DeleteUser= (req,res)=>{
    let deleteEmail=req.body.email;
    monmodel.findOneAndDelete(({email:deleteEmail}),function(err,data){
      if(err){
          res.send({ message:"An error occured. Please enter a valid emailid"});
      }
      else{
          if(data==null){
              res.send({ message: "No user with this email id exists"});
          }
          else{
              res.send({ message: "User successfully deleted"});
          }
      }  
    });
  
  }
   const LoginUser=async(req,res)=>{
    try{
        const{email,password}=req.body;
        if(!email||!password){
            res.send({message: "Please enter all the fields"});
            return 
        }
        const userLogin = await monmodel.findOne({email:email});
        if(userLogin){
            const isMatch = await bcrypt.compare(password,userLogin.password);
            if(!isMatch){
                res.send({message: "Invalid credentials"});  
            }
            else{
                res.send({message: "User succeessfully logged in",user:userLogin});
            }
        
        }
        else{
            res.send({message: "User does not exists"});  
        }
    }
    catch(error){
        res.json(error);
    }
}
 //validation
 function validatePassword(password) {
    let regex =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    
     if (!regex.test(password)) {
    
    return false;
    
    }   
    
    else {
    
    return true;
    }
}
module.exports={
    CreateUser,GetAllUser,UpdateUser,DeleteUser,LoginUser
}