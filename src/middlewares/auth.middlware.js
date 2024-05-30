import jwt from 'jsonwebtoken';
import {prisma} from '../utils/prisma/index.js';


export default async function (req,res,next) {
    try {
        const {authorization}=req.cookies;

        const [tokenType,token]=authorization.split(" ");
        if (tokenType!=='Bearer') throw new Error("토큰 타입이 일치하지 않습니다");
        next();
        const decodedToken=jwt.verify(token,'first_token');
        
        const userid=decodedToken['userid'];
        const user=await prisma.users.findFirst({
            where: {
                userid:+userid
            }
        });

        req.user=user;
    }
    catch(err) {
        next(err);
    }
}