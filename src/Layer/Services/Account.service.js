export class AccountService {
    constructor (UsersRepository) {
        this.UsersRepository=UsersRepository;
    }

    findEmail=async(email)=>{
        const user=this.UsersRepository.findEmail(email);
        return user;
    }

    findUser=async(userId)=> {
        const user=await this.UsersRepository.findUser(userId);
        return user;
    }

    findAllUser=async()=> {
        const users=await this.UsersRepository.findAllUser();
        return users;
    }

    createUser=async(email,password,role)=>{
        const createdUser=await this.UsersRepository.createUser(email,password,role);
        return createdUser;
    }

    createUserInfo=async(userId,name,age,gender)=>{
        const createuserinfo=await this.UsersRepository.createUserInfo(userId,name,age,gender);
        return createuserinfo;
    }

    createAccount=async(email,password,role,name,age,gender,profilimage) =>{
        const createduser=await this.createUser(email,password,role);
        const createduserinfo=await this.createUserInfo(createduser.userId,name,age,gender,profilimage);

        return {createduser};
    }


}