export class AccountController {
    constructor (AccountService) {
        this.AccountService=AccountService;
    }
    myAccountCheck=async(req,res,next)=>{

    };

    login=async(req,res,next)=>{
        const {email,password}=req.body;
        const userId=await this.AccountService.login(email,password);

        //계정정보가 올바르지 않은 두 상황을 규정하여 검증
        if (userId===-1) return res.status(404).json({ErrorMessage:"존재하지 않는 계정입니다"});
        if (userId===0) return res.status(400).json({ErrorMessage:"비밀번호가 틀립니다!"});

        res.cookie("Autorization",userId);

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

            await this.AccountService.createAccount(email,password,role,name,age,gender,profilimage);
            return res.status(201).json({Message:"계정이 생성되었습니다!"});
        }
        catch(err) {

        }
    }
}