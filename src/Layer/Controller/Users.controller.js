export class UsersController {
    constructor (UsersServices) {
        this.UsersServices=UsersServices;
    }
    createAccount=async(req,res)=>{
        try {
            const {email,password,role,name,age,gender,profilimage}=req.body;
            
        }
        catch(err) {

        }
    }
}