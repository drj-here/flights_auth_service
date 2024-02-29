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

module.exports={validateUserAuth}