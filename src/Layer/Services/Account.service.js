export class AccountService {
    constructor(UsersRepository, bcrypt, jwt) {
        this.UsersRepository = UsersRepository;
        this.bcrypt = bcrypt;
        this.jwt = jwt;
    }

    //데이터 토큰화
    tokenization = async (data) => {
        const memory = this.jwt.sign(data, process.env.SECRET_TOKEN_KEY, { expiresIn: "15m" });
        const token=`Bearer ${memory}`;
        return token;
    }

    //데이터 암호화
    hashdata = async (data) => {
        const saltround = 10;
        const hasheddata = await this.bcrypt.hash(data, saltround);
        return hasheddata;
    }

    //이메일로 유저를 찾는 함수
    findEmail = async (email) => {
        const user = await this.UsersRepository.findEmail(email);
        return user;
    }

    //userId로 유저를 찾는 함수
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

        //필요한 입력을 전부 받았는지 확인
        if (!email||!password||!name||!age||!gender) {
            const error={status:400,ErrorMessage:"필요한 정보를 전부 입력해주세요!"};
            return error;
        }

        //해당 계정이 이미 존재하는지 확인
        if (await this.findEmail(email)) {
            const error={status:401,ErrorMessage:"이미 존재하는 계정입니다."};
            return error;
        }

        //비밀번호 암호화
        const hashedpassword = await this.hashdata(password);

        //유저 기록
        const createduser = await this.createUser(email, hashedpassword, role);
        //유저 정보기록
        const createduserinfo = await this.createUserInfo(createduser.userId, name, age, gender, profilimage);

        return { createduser };
    }

    //로그인 함수
    login = async (email, password) => {

        const user=await this.findEmail(email)

        //해당 계정이 존재하는지 검증
        if (!user) {
            const error={status:404,ErrorMessage:"해당 계정이 존재하지 않습니다!"};
            return error;
        }
        
        //해당 계정의 비밀번호가 일치하는지 검증
        if (!(await this.bcrypt.compare(password, user.password))) {
            const error={status:403,ErrorMessage:"해당 계정의 비밀번호와 일치하지 않습니다!"};
            return error;
        }

        //성공할 경우 토큰을 만들고 반환
        const token=await (this.tokenization({userId:user.userId}));
        
        return token;
    }

    //본인 계정의 정보를 확인하는 함수
    myinfo=async(userId)=>{
        const user=this.findUser(userId);
        
    }
}