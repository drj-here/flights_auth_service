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

module.exports={
    create,
    signIn
}