const doubt=require('../models/doubt');
const ta=require('../models/ta')
const comment=require('../models/comment')

module.exports.addComment=async (req,res)=>{
    try{
      if(req.user.role==1)
    {
      return res.json('200',{status:500,message:"You are not authorized to comment! You are not student"})
    }
        const {doubtId,description}=req.body;
        const {_id}=req.user;
        const newComment=await comment.create({DoubtId:doubtId,User:_id,description:description});
        await doubt.findByIdAndUpdate(doubtId,{$push:{'comments':newComment._id}});

        return res.json('200',{message:'comment created successfully',status:200});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'error in creating comment ',error:err})
        }
}

module.exports.getComment=async (req,res)=>{
    try{
        const {doubtId}=req.query;
        const Comments=await comment.find({DoubtId:doubtId}).populate('User').sort({createdAt:-1}).select('User').select('description');
        console.log('Comments',Comments)
        return res.json('200',{message:'comment genearted successfully',status:200,comments:Comments});
      }
        catch(err){
            console.log(err);
            res.json('200',{status:500,message:'error in generating comment ',error:err})
        }
}