export class AccountController {
    constructor (AccountService,bcrypt,jwt) {
        this.AccountService=AccountService;
        this.bcrypt=bcrypt;
        this.jwt=jwt;
    }

    login=async(req,res,next)=>{
        try {
        const {email,password}=req.body;

        //서비스 계층의 로그인 함수를 실행,성공할 경우: 토큰을 반환
        const user=await this.AccountService.login(email,password);

        //계정을 만든 결과값에 오류가 있을시 오류메세지가 존재, 반환된 상태값과 오류메세지를 출력===모든 실패할 경우
        if (user.ErrorMessage) {
            return res.status(user.status).json({ErrorMessage:user.ErrorMessage});
        }

        //성공할 경우
        const token=user;

        //토큰을 쿠키에 저장
        const expirationtime=1000*60*15;
        res.cookie("Authorization",token,{maxAge:expirationtime});

        return res.status(200).json({Message:"성공적으로 로그인 되었습니다"});
        }
        catch(err) {
            next(err);
        }
    }
    
    createAccount=async(req,res,next)=>{

        try {
            const {email,password,role,name,age,gender,profilimage}=req.body;
            
            //서비스 계층에 존재하는 계정 생성 함수를 그대로 사용
            const createdAccount=await this.AccountService.createAccount(email,password,role,name,age,gender,profilimage); //암호화 과정은 service에서 실행
            
            //계정을 만든 결과값에 오류가 있을시 오류메세지가 존재, 반환된 상태값과 오류메세지를 출력
            if (createdAccount.ErrorMessage) {
                return res.status(createdAccount.status).json({ErrorMessage:createdAccount.ErrorMessage});
            }

            return res.status(201).json({Message:"계정이 생성되었습니다!"});
        }
        catch(err) {
            next(err);
        }
    }

    myinfo=async(req,res,next)=>{
        try {
            const userId=req.user.userId;
            

            return res.status(200).json({Message:"코드 검증 완료"});
        }
        catch(err) {
            next(err);
        }
        
        
    }





    logout=async(req,res,next)=>{
        res.clearCookie("Authorization");
    }
}