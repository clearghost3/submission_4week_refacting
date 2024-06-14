export class UsersRepository{
    constructor (prisma) {
        this.prisma=prisma;
    }

    //이메일로 유저 찾기
    findEmail=async(email)=>{
        const user=await this.prisma.users.findFirst({
            where: {
                email:email
            }
        })
        return user;
    };

    //아이디로 유저 찾기
    findUser=async(userId)=>{
        const user=await this.prisma.users.findFirst({
            where: {
                userId:+userId
            }
        })
        return user;
    };

    //모든 유저 찾기
    findAllUser=async()=>{
        const users=await this.prisma.users.findmany();
    }

    //유저 만들기
    createUser=async(email,password,role)=>{
        const createUser=await this.prisma.users.create({
            data:{
                email,password,role
            }
        });

        return createUser;
    };

    //유저 정보 만들기
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