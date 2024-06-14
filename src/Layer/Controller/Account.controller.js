export class AccountController {
    constructor (AccountService,bcrypt,jwt) {
        this.AccountService=AccountService;
        this.bcrypt=bcrypt;
        this.jwt=jwt;
    }

    login=async(req,res,next)=>{
        const {email,password}=req.body;
        const userId=await this.AccountService.login(email,password);

        //계정정보가 올바르지 않은 두 상황을 규정하여 검증
        if (userId===-1) return res.status(404).json({ErrorMessage:"존재하지 않는 계정입니다"});
        if (userId===0) return res.status(400).json({ErrorMessage:"비밀번호가 틀립니다!"});

        const Token=this.jwt.sign(
            {
                userId:userId,
            },
            process.env.SECRET_TOKEN_KEY,{expiresIn: "15m"}
        );

//   const token = jwt.sign(
//     {
//       userid: user.userid,
//     },
//     AccessTokenKey,
//     { expiresIn: "15m" }
//   );

        //인증에 성공할 시 쿠키를 보관
        res.cookie("Autorization",Token);



        return res.status(200).json({Message:"성공적으로 로그인 되었습니다"});
    }

    logout=async(req,res,next)=>{

    }
    
    createAccount=async(req,res,next)=>{
        try {
            const {email,password,role,name,age,gender,profilimage}=req.body;
            if (!email||!password||!name||!age||!gender) {
                return res.status(400).json({ErrorMessage:"필요한 정보를 전부 입력해주세요!"});
            }

            const is_email=await this.AccountService.findEmail(email);

            if (is_email) return res.status(400).json({ErrorMessage:"이미 존재하는 이메일입니다"});

            //비밀번호를 암호화합니다.
            const saltround=10;
            const hashedpassword=await this.bcrypt.hash(password,saltround);

            await this.AccountService.createAccount(email,hashedpassword,role,name,age,gender,profilimage);
            return res.status(201).json({Message:"계정이 생성되었습니다!"});
        }
        catch(err) {

        }
    }
}