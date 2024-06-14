export class AccountService {
    constructor(UsersRepository) {
        this.UsersRepository = UsersRepository;
    }

    //이메일로 유저를 찾는 함수
    findEmail = async (email) => {
        const user = await this.UsersRepository.findEmail(email);
        return user;
    }

    //userid로 유저를 찾는 함수
    findUser = async (userId) => {
        const user = await this.UsersRepository.findUser(userId);
        return user;
    }

    //모든 유저를 반환하는 함수
    findAllUser = async () => {
        const users = await this.UsersRepository.findAllUser();
        return users;
    }

    //유저를 만드는 함수
    createUser = async (email, password, role) => {
        const createdUser = await this.UsersRepository.createUser(email, password, role);
        return createdUser;
    }

    //유저정보를 만드는 함수
    createUserInfo = async (userId, name, age, gender) => {
        const createuserinfo = await this.UsersRepository.createUserInfo(userId, name, age, gender);
        return createuserinfo;
    }

    //계정을 만드는 함수
    createAccount = async (email, password, role, name, age, gender, profilimage) => {
        const createduser = await this.createUser(email, password, role);
        const createduserinfo = await this.createUserInfo(createduser.userId, name, age, gender, profilimage);

        return { createduser };
    }

    //로그인 함수
    login = async (email, password) => {
        const user = await this.findEmail(email);

        if (!user) return -1;
        if (user.password!==password) return 0;
        
        return user.userId;
    }
}