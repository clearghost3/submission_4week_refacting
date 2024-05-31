import jwt from 'jsonwebtoken';
import {prisma} from '../utils/prisma/index.js';


export default async function (req,res,next) {
    try {
        const {authorization}=req.cookies;

        const [tokenType,token]=authorization.split(" ");

        //토큰타입과 토큰 확인

        const decodedToken=jwt.verify(token,'first_token');
        

        if (tokenType!=='Bearer') {
            console.log("tokenType:",tokenType);
            throw new Error(`토큰 타입이 일치하지 않습니다`);
        }
        
        
        const userid=decodedToken['userid'];
        const user=await prisma.users.findFirst({
            where: {
                userid:+userid
            }
        });

        if (!user) {
            res.clearCookie('authorization');
            throw new Error("존재하지 않는 사용자");
        }

        //관리자 권한이 있다면 인가 과정에서 관리자 권한을 부여
        if (user.role==="MANGER") {
            req.manager=1;
        }

        req.user=user;

        req.test=user;

        next();
    }
    catch(error) {
        res.clearCookie('authorization');
        switch(error.name) {
            case 'TokenExpiredError':   //토큰이 만료되었을 때 발생
                return res.status(401).json({message:"토큰이 만료되었습니다."});
            case 'JsonWebTokenError':   //토큰에 검증이 실패했었을 때 발생
                return res.status(401).json({message:"토큰 검증이 실패했습니다"});
            default:
                return res.status(401).json({message: error.message?? "비 정상적인 요청입니다."});
        }
    }
}