const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    doubts:[{
        type:mongoose.Types.ObjectId,
        ref:'doubt'
    }],
    password:{
        type:String
    },
    role:{
        type:Number,
        default:0
    }
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('user',userSchema)