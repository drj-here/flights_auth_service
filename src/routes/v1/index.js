const express=require('express')
const router=express.Router()
const UserController=require('../../controllers/user-controller')
const {AuthRequestValidator}=require('../../middlewares/index')

router.get('/info',(req,res)=>{
    return res.json({message:'response from auth router'})
})
router.post('/signup',AuthRequestValidator.validateUserAuth,UserController.create)
router.post('/signin',AuthRequestValidator.validateUserAuth,UserController.signIn)
router.get('/isAuthenticated',UserController.isAuthenticated)
router.get('/isAdmin',AuthRequestValidator.validateAdminRequest,UserController.isAdmin)
module.exports=router;