export class UsersService {
    constructor (UsersRepository) {
        this.UsersRepository=UsersRepository;
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


}