const mongoose=require('mongoose');
const commentSchema=mongoose.Schema({
    DoubtId:{
        type:mongoose.Types.ObjectId,
        ref:'doubt'
    },
    User:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    description:{
        type:String,
    }
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('comment',commentSchema)