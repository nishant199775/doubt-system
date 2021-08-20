const express=require('express');
const router=express.Router();


router.use('/doubt',require('./doubt'));
router.use('/comment',require('./comment'))
router.use('/ta',require('./ta'));
router.use('/user',require('./user'));


module.exports=router;