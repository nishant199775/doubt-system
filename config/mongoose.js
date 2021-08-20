const mongoose=require('mongoose');
require('dotenv').config();
const url=process.env.dburl;
const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}
mongoose.Promise=global.Promise
mongoose.connect(url,connectionParams)
const db=mongoose.connection;
db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',()=>{
    console.log('connected to db successfully');
})