export class UsersRepository{
    constructor (prisma) {
        this.prisma=prisma;
    }
    findemail=async(email)=>{
        const user=await this.prisma.user.findFirst({
            where: {
                email:email
            }
        })
        return user;
    };

    findUser=async(userId)=>{
        const user=await this.prisma.users.findFirst({
            where: {
                userId:+userId
            }
        })
    };


    findAllUser=async()=>{
        const users=await this.prisma.users.findmany();
    }

    createUser=async(email,password,role)=>{
        const createUser=await this.prisma.users.create({
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

    createUserInfo=async(UserId,name,age,gender) =>{
        const createUserInfo=await this.prisma.userinfos.create({
            data: {
                UserId:+UserId,
                name:name,
                age:+age,
                gender:gender,
            }
        });
    };
    
}