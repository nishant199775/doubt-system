const passport=require('passport')
const jwtStrategy=require('passport-jwt').Strategy;
const extractJWT=require('passport-jwt').ExtractJwt;
const user=require('../models/user');
const ta=require('../models/ta');

require('dotenv').config();

const opts={
    jwtFromRequest:extractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey:process.env.jwtSecret||'doubt'
}
passport.use(new jwtStrategy(opts,(jwtPayLoad,done)=>{

  if(jwtPayLoad.role==0){
    user.findById(jwtPayLoad._id,(err,user)=>{
      if(err){console.log("error in finding user"); return ;}
      if(user){return done(null,user)}
      else{return done(null,false)}
  
  })
}
  else{
    ta.findById(jwtPayLoad._id,(err,user)=>{
      if(err){console.log("error in finding ta"); return ;}
      if(user){return done(null,user)}
      else{return done(null,false)}
    })
  }


}))
module.exports=passport;