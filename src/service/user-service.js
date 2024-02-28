const UserRepository=require('../repository/user-repo')

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
}

module.exports=UserService;