const jwt = require('jsonwebtoken');
const user=require('../models/user')
const ta=require('../models/ta')
const doubt=require('../models/doubt')

module.exports.create=async function(req,res){
    
    try{
      const {role}=req.body;
      console.log("req data",req.body);
        const userResult=await user.findOne({Email:req.body.email})
        const taResult=await ta.findOne({Email:req.body.email});
      if(userResult||taResult)
        { 
            console.log("user",userResult);
            return res.json(200,{message:"email already exist",status:500});
        }
      else if(role==0)
        {
          
            const newUser=await user.create(req.body)
            console.log("user created successfully");
            return res.status(200).json({message:"user successfully created",
                    data:newUser,status:200});
        }
        else if(role==1)
        {
          const newTa=await ta.create(req.body)
            console.log("TA created successfully");
            return res.status(200).json({message:"TA successfully created",
                    data:newTa,status:200});
        }
      }
    catch(err){
        console.log(err);
        return res.status(200).json({message:"error in creating user",error:err,status:500});
    }
 }

module.exports.createSession=async function(req,res){
    try{
      console.log("email"+req.query.email+'pass'+req.query.password);
      const {role}=req.query;
      console.log('role',role);
      if(role==0)
      {
        const userResult=await user.findOne({email:req.query.email})
        console.log(userResult);
        if(!userResult || userResult.password!=req.query.password)
        {
          return res.json(200,{message:"username or password is incorrect",status:500})
        }
        else{
          return res.json(200,{message:"user signed in successfully",role:0,status:200,
          token:jwt.sign(userResult.toJSON(),'doubt',{expiresIn:100000})})
        }
      }
      else{
        const taResult=await ta.findOne({email:req.query.email})
        if(!taResult || taResult.password!=req.query.password)
        {
          return res.json(200,{message:"username or password is incorrect",status:500})
        }
        else{
          return res.json(200,{message:"TA signed in successfully",role:1,status:200,
          token:jwt.sign(taResult.toJSON(),'doubt',{expiresIn:100000})})
        }
      }
     
    }
      catch(err){
        console.log(err);
        return res.json(401,{message:"error in signing from jwt",error:err});
      }
  }

  module.exports.getDoubtByUser=async (req,res)=>{
    try{
        const {_id}=req.user;
        const DoubtsByuser=await user.findById(_id).populate('doubts').sort({createdAt:-1}).select('doubts');
        console.log('DoubtsByuser',DoubtsByuser)
        return res.json('200',{message:'comment genearted successfully',status:200,doubts:DoubtsByuser});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'error in generating comment ',error:err})
        }
  }

  module.exports.getDoubts=async (req,res)=>{
    try{
      const doubts=await doubt.find({}).populate('createdBy').populate('comments').sort({updatedAt:-1});
        return res.json('200',{status:200,message:"doubts generated successfully for student",doubts:doubts});
        
    }
    catch(err){
      console.log('error in getting doubts for student',err);
    }
  }