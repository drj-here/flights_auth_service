const UserRepository=require('../repository/user-repo')
const jwt=require('jsonwebtoken')
const {JWT_KEY}=require('../config/serverConfig')
const bcrypt=require('bcrypt')
class UserService{
    constructor(){
        this.userRepository=new UserRepository()
    }

    async create(data){
        try{
           const result=await this.userRepository.create(data)
           return result
        }
        catch(error){
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }

    async destroy(data){
        try{
           const result=await this.userRepository.destroy(data)
           return result
        }
        catch(error){
            console.log("Something went wrong in the service layer")
            throw error;
        }
    }

    createToken(user){
        try{
           const token=jwt.sign(user,JWT_KEY,{expiresIn:'1d'})
           return token
        }
        catch(error){
            console.log("Something went in token creation")
            throw error;
        }
    }

    verifyToken(token){
        try{
           const response=jwt.verify(token,JWT_KEY)
           return response
        }
        catch(error){
            console.log("Something went wrong in token validation")
            throw error;
        }
    }

    checkPassword(userInputPassword,encryptedPassword){
        try{
           return bcrypt.compareSync(userInputPassword,encryptedPassword)
        }
        catch(error){
            console.log("Something went wrong in password validation")
            throw error;
        }
    }
}

module.exports=UserService;