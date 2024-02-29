const { response } = require('express')
const UserService=require('../service/user-service')

const userService=new UserService()
const create=async(req,res)=>{
    try{
        const result=await userService.create({
            email:req.body.email,
            password:req.body.password
        })
        return res.status(201).json({
            data:result,
            success:true,
            message:'successfully created the user',
            err:{}
        })
    }
    catch(error){
        return res.status(500).json({
            data:{},
            success:false,
            message:'not able to create the user',
            err:error
        })
    }
}

const signIn=async(req,res)=>{
    try{
        const response=await userService.signIn(req.body.email,req.body.password)
        return res.status(200).json({
            data:response,
            success:true,
            message:'signed in successfully',
            err:{}
        })
    }
    catch(error){
        return res.status(500).json({
            message:'not able to signin',
            success:false,
            err:error
        })
    }
}

const isAuthenticated=async(req,res)=>{
    try{
        const token=req.headers['x-access-token']
        const response=await userService.isAuthenticated(token)
        return res.status(200).json({
            success:true,
            message:'User authenticated and token is valid',
            err:{},
            data:response
        })
    }
    catch(error){
        return res.status(500).json({
            message:'not able to verify auth',
            success:false,
            err:error
        })
    }
}

module.exports={
    create,
    signIn,
    isAuthenticated
}