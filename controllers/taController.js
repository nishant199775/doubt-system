const doubt=require('../models/doubt');
const ta=require('../models/ta')

module.exports.takeDoubt=async (req,res)=>{
    try{
      if(req.user.role==0)
    {
      return res.json('200',{status:500,message:"You are not authorized to take doubt! You are not TA"})
    }
        const doubtId=req.query.id;
        const {_id}=req.user;
        await doubt.findByIdAndUpdate(doubtId,{'active':false});
        await ta.findByIdAndUpdate(_id,{$push:{'accepted':doubtId}});
        const date=new Date();
        
        
        res.json('200',{message:'Doubt accepted successfully',status:200,acceptedTime:date.getTime()});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'Error in accepting doubt ',error:err})
        }
}
module.exports.resolveDoubt=async (req,res)=>{
    try{
      if(req.user.role==0)
    {
      return res.json('200',{status:500,message:"You are not authorized to resolve doubt! You are not TA"})
    }
        const {doubtId,acceptedTime}=req.body;
        const {_id}=req.user;
        const taDetails=await ta.findById(_id);
        console.log('tadetails',taDetails)
        const currDate=new Date();
        const currTime=currDate.getTime();
        console.log('accepted'+acceptedTime+'resolve'+currTime);
        console.log('average time',taDetails.averageTime);
        console.log('time',taDetails.averageTime+Math.round((currTime-acceptedTime)/60000));
        await doubt.findByIdAndUpdate(doubtId,{'resolved':true,'active':false});
        await ta.findByIdAndUpdate(_id,{'averageTime':taDetails.averageTime+Math.round((currTime-acceptedTime)/60000),$push:{'resolved':doubtId}
        });
        
        
        res.json('200',{message:'Doubt resolved successfully',status:200});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'Error in resolving doubt ',error:err})
        }
}
module.exports.escalateDoubt=async (req,res)=>{
    try{
      if(req.user.role==0)
    {
      return res.json('200',{status:500,message:"You are not authorized to take doubt! You are not TA"})
    }
        const {doubtId,acceptedTime}=req.body;
        const {_id}=req.user;
        const currDate=new Date();
        const currTime=currDate.getTime();
        console.log('accepted'+acceptedTime+'resolve'+currTime);
        const taDetails=await ta.findById(_id);
        await doubt.findByIdAndUpdate(doubtId,{'escalated':true,active:true});
        await ta.findByIdAndUpdate(_id,{averageTime:taDetails.averageTime+Math.round((currTime-acceptedTime)/60000),$push:{'escalated':doubtId}});
        
        
        res.json('200',{message:'Doubt escalated successfully',status:200});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'Error in escalating doubt ',error:err})
        }
}

module.exports.taDetails=async (req,res)=>{
    try{
        const {_id,role}=req.user;
        if(role===0)
        {
            return res.json('200',{status:501,message:"You are not TA! Cant get details!"})
        }
        else{
            const details=await ta.findById(_id);
            const {accepted,escalated,resolved,averageTime}=details;
            res.json('200',{status:200,message:"Details generated successfully",
            details:{accepted:accepted.length,resolved:resolved.length,escalated:escalated.length,averageTime:averageTime}})
        }
    }
    catch(err)
    {
        console.log(err);
        res.json('200',{status:500,message:"Error in getting TA details",error:err})
    }
}

module.exports.getAllTA=async (req,res)=>{
    try{
        const allTa=await ta.find({}).sort({resolved:-1})
        res.json('200',{status:200,message:'all ta generated',details:allTa});

    }
    catch(err){
        console.log(err);
    }
}