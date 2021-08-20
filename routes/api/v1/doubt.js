const express=require('express');
const router=express.Router();
const doubtController=require('../../../controllers/doubtController')
const passport=require('passport');

// router.get('/',passport.authenticate('jwt',{session:false}),eventsController.getEvents);
router.post('/create',passport.authenticate('jwt',{session:false}),doubtController.createDoubt);
// router.post('/addDoubt',passport.authenticate('jwt',{session:false}),doubtController.addDoubt);
 router.post('/addAnswer',passport.authenticate('jwt',{session:false}),doubtController.addAnswer);
 router.get('/getDoubts',doubtController.getDoubts);
// router.use('/token',require('./token'));
// router.get('/getEventById',eventsController.getEventById);
// router.get('/getEventByType',eventsController.getEventByType);
// router.get('/getTopEvents',eventsController.getTopEvents);
module.exports=router;