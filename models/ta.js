const mongoose=require('mongoose');
const taSchema=mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    resolved:[{
        type:mongoose.Types.ObjectId,
        ref:'doubt'
    }],
    accepted:[{
        type:mongoose.Types.ObjectId,
        ref:'doubt'
    }],
    escalated:[{
        type:mongoose.Types.ObjectId,
        ref:'doubt'
    }],
    averageTime:{
        type:Number,
        default:0
    }
    
},{
    timestamps:true
}
)
module.exports=mongoose.model('ta',taSchema)