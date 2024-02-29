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

    async signIn(email,plainPassword){
        try{
           const user=await this.userRepository.getByEmail(email)
           const encryptedPassword=user.password
           const passwordMatch=this.checkPassword(plainPassword,encryptedPassword)
           if(!passwordMatch){
            console.log("password doesnt match")
            throw {error:'Incorrect password'}
           }
           const newToken=this.createToken({email:user.email,id:user.id})
           return newToken;
        }
        catch(error){
            console.log("Something went wrong in signIn service")
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

    async isAuthenticated(token){
        try{
           const response=this.verifyToken(token)
           if(!response) throw {error:'Invalid token'}
           const user=await this.userRepository.getById(response.id)
           if(!user) throw {error:'No user exists with this token'}
           return user.id;
        }
        catch(error){
            console.log("Something went wrong in auth process")
            throw error;
        }
    }
}

module.exports=UserService;