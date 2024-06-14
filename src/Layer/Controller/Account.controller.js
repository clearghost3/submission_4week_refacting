export class AccountController {
    constructor (AccountService) {
        this.AccountService=AccountService;
    }
    
    createUserInfo=async(req,res,next)=> {
        const {name,age,gender}=req.body;
        await this.AccountService.createUserInfo(1,name,age,gender,profilimage);
        return res.status(200).json({Message:"유저 정보가 기록되었습니다"});
    }

    createAccount=async(req,res,next)=>{
        try {
            const {email,password,role,name,age,gender,profilimage}=req.body;
            if (!email||!password||!name||!age||!gender) {
                return res.status(400).json({ErrorMessage:"필요한 정보를 전부 입력해주세요!"});
            }

            const is_email=await this.AccountService.findEmail(email);

            if (is_email) return res.status(400).json({ErrorMessage:"이미 존재하는 이메일입니다"});

            this.AccountService.createAccount(email,password,role,name,age,gender,profilimage);
            return res.status(201).json({Message:"계정이 생성되었습니다!"});
        }
        catch(err) {

        }
    }
}