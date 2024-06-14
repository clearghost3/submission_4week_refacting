export class UsersRepository{
    constructor (prisma) {
        this.prisma=prisma;
    }
    findEmail=async(email)=>{
        const user=await this.prisma.users.findFirst({
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
        return user;
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

        return createUser;
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
        return createUserInfo;
    };
    
}