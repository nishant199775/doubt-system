const doubt=require('../models/doubt');
const user=require('../models/user');


module.exports.createDoubt=async (req,res)=>{
    try{
      if(req.user.role==1)
    {
      return res.json('200',{status:500,message:"You are not authorized to create doubt! You are TA"})
    }
        const data=req.body;
        console.log(data)
        data['createdBy']=req.user._id;
        const doubtResult=await doubt.create(data);
        await user.findByIdAndUpdate(req.user._id,{$push:{'doubts':doubtResult._id}})
        
        res.json('200',{status:200,message:'doubt created successfully',doubt:doubtResult});
      }
        catch(err){
            console.log(err);
            res.json('500',{message:'error in creating doubt from db',error:err})
        }
}

module.exports.addAnswer=async (req,res)=>{
  try{
    if(req.user.role==0)
    {
      return res.json('200',{status:500,message:"You are not authorized to answer doubt!"})
    }
      const {answer,doubtId}=req.body;
      console.log('answer and doubtId',answer,doubtId);
      const status=await doubt.findByIdAndUpdate(doubtId,{'answer':answer,'answeredBy':req.user.name});
      console.log('status',status);
      return res.json('200',{status:200,message:"answer added successfully"})
      
  }
  catch(err){
    console.log('error in adding doubt',err);
  }
}

module.exports.getDoubts=async (req,res)=>{
  try{
    const doubts=await doubt.find({'active':true}).populate('createdBy').sort({updatedAt:-1});
      return res.json('200',{status:200,message:"doubts generated successfully",doubts:doubts});
      
  }
  catch(err){
    console.log('error in getting doubts doubt',err);
  }
}


