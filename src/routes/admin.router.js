import express from "express";

//middlewares
import { prisma } from "../utils/prisma/index.js";
import authMiddlware from "../middlewares/auth.middlware.js";


const router=express.Router();

//관리자 패널=======================================

//관리자_ 전체 이력서 상세조회 router
router.get("/manager/resume/:resumeid", authMiddlware, async(req,res,next) => {
    //사용자가 매니저인지 확인
    if (!req.manager) {
        const error= new Error(`사이트에 접근할 권한이 없습니다!`);
        error.name='ForbiddenError';
        return next(error);
    }

    const user = req.user;
    const resumes=await prisma.resume.findMany();


    return res.status(200).json({resumes});
});

//관리자_ 특정 이력서 수정 라우터 modify particular resume router
router.put("/manager/resume/:resumeid", authMiddlware, (req,res,next) => {
    //사용자가 매니저인지 확인
    if (!req.manager) {
        const error= new Error(`사이트에 접근할 권한이 없습니다!`);
        error.name='ForbiddenError';
        return next(error);
    }
    const user = req.user;

    return res.status(200).json({Message:"코드 검증 완료"});
});



export default router;