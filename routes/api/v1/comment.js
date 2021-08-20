const express=require('express');
const router=express.Router();
const commentController=require('../../../controllers/commentController')
const passport=require('passport');

router.post('/addComment',passport.authenticate('jwt',{session:false}),commentController.addComment)
router.get('/getComment',commentController.getComment);

module.exports=router;