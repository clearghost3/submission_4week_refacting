export class UsersRepository{
    constructor (prisma) {
        this.prisma=prisma;
    }

    findUser=async(userId)=>{
        const user=await this.prisma.users.findFirst({
            where: {
                userId:+userId
            }
        });
    }
    findAllUser=async()=>{
        const users=await this.prisma.users.findmany();
    }

    createUser=async(email,password,role)=>{
        const createUser=await this.prisma.users.creat({
            data:{
                email,password,role
            }
        });
        return {
            email:createUser.email,
            password:createUser.password,
            role:createUser.role,
        }
    };

    createUserInfo=async(UserId,name,age,gender,profilimage) =>{
        const createUserInfo=await this.prisma.users.creat({
            data: {
                UserId:+UserId,
                name,
                age:+age,
                gender,
                profilimage,
            }
        });
    };
    
}