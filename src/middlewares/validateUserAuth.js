const validateUserAuth=async(req,res,next)=>{

    if(!req.body.email || !req.body.password){
        return res.status(400).json({
            success:false,
            message:'something went wrong',
            err:'Both email and password required'
        })
    }
    
    next()
}

const validateAdminRequest=async(req,res,next)=>{
    if(!req.body.id){
        return res.status(400).json({
            success:false,
            message:'something went wrong',
            err:'user id not given'
        })
    }
    next()
}

module.exports={validateUserAuth,validateAdminRequest}