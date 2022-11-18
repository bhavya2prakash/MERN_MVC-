const monmodel = require("../models/model");
const QuerlistofUsers = (res)=>{
    monmodel.find((err,val)=>{
               if(err){
                res.send(err);
                return;
               }
               else{
                res.json(val);
               }
    
})}
module.exports={QuerlistofUsers};
