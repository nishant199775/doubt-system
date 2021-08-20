const express=require('express');
const router=express.Router();
const userController=require('../../../controllers/userController');
const passport=require('passport');

 router.post('/signup',userController.create);
router.get('/signin',userController.createSession);
router.get('/getDoubtsByUser',passport.authenticate('jwt',{session:false}),userController.getDoubtByUser);

 router.get('/getDoubts',passport.authenticate('jwt',{session:false}),userController.getDoubts);
// router.get('/showCreatedEvents',passport.authenticate('jwt',{session:false}),userController.showCreatedEvents);
// router.get('/showJoinedEvents',passport.authenticate('jwt',{session:false}),userController.showJoinedEvents)

module.exports=router;