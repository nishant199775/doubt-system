const express=require('express');
const router=express.Router();
const taController=require('../../../controllers/taController')
const passport=require('passport');

router.get('/takeDoubt',passport.authenticate('jwt',{session:false}),taController.takeDoubt);
router.post('/resolve',passport.authenticate('jwt',{session:false}),taController.resolveDoubt);
router.post('/escalate',passport.authenticate('jwt',{session:false}),taController.escalateDoubt);
router.get('/getTaDetails',passport.authenticate('jwt',{session:false}),taController.taDetails);
router.get('/getAllTa',passport.authenticate('jwt',{session:false}),taController.getAllTA);
router.get('/getUnresolvedDoubt',passport.authenticate('jwt',{session:false}),taController.acceptedUnresolvedDoubt);
module.exports=router;