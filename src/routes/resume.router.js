import express from "express";

//middlewares
import { prisma } from "../utils/prisma/index.js";
import authMiddlware from "../middlewares/auth.middlware.js";

//이력서 지원 router
const router = express.Router();

router.post("/resume/apply", authMiddlware, async (req, res, next) => {
  const { content } = req.body;

  const userid = req.user.userid;

  //이력서를 만들기 위해 회원의 필요한 정보만 불러오기
  const userinfo = await prisma.userinfos.findFirst({
    where: {
      Userid: +userid,
    },
    select: {
      name: true,
      age: true,
    },
  });

  const createcontent = await prisma.resume.create({
    data: {
      name: userinfo.name,
      age: +userinfo.age,
      Userid: +userid,
      content,
    },
  });

  return res.status(200).json({ Message: "이력서 지원이 완료되었습니다." });
});

//회원의 이력서 상세조회
router.get("/resume/:resumeid", authMiddlware, async (req, res, next) => {
  const resumeid = parseInt(req.params.resumeid, 10); // 문자열을 정수로 변환
  const userid = await req.user.userid;

  //이력서가 존재하지 않을 경우

  console.log("resumeid:", resumeid);

  const resume = await prisma.resume.findFirst({
    where: {
      resumeid: resumeid,
      Userid: +userid,
    },
    select: {
      name: true,
      age: true,
      content: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  if (!resume)
    return res
      .status(404)
      .json({ ErrorMessage: "존재하지 않거나 권한이 없습니다!" });
  console.log(resume);
  return res.status(200).json({ resume });
});

//회원의 이력서 수정
router.put("/resume/:resumeid", authMiddlware, async (req, res, next) => {
  try {
    const resumeid = req.params.resumeid;
    const userid = req.user.userid;
    const { content } = req.body;

    const resume = await prisma.resume.findFirst({
      where: {
        resumeid: +resumeid,
        Userid: +userid,
      },
      select: {
        content: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!resume)
      return res
        .status(401)
        .json({
          ErrorMessage: "해당하는 이력서가 존재하지 않거나 권한이 없습니다!",
        });

    const modify = await prisma.resume.update({
      where: {
        resumeid: +resumeid,
        Userid: +userid,
      },
      data: {
        content,
      },
    });

    return res.status(200).json({ Message: "이력서 수정 완료" });
  } catch (err) {
    next(err);
  }
});
//관리자 패널=======================================

//관리자의 모든 이력서 상세조회 router
router.get("/manager/resume/:resumeid", authMiddlware, async(req,res,next) => {
    //사용자가 매니저인지 확인
    if (!req.manager) {
        const error= new Error(`사이트에 접근할 권한이 없습니다!`);
        error.name='ForbiddenError';
        next(error);
    }

    const user = req.user;
    const resumes=await prisma.resume.findMany();


    return res.status(200).json({resumes});
});

//관리자의 이력서 수정 router
router.patch("/manager/resume/:resumeid", authMiddlware, (req,res,next) => {
    //사용자가 매니저인지 확인
    if (!req.manager) {
        const error= new Error(`사이트에 접근할 권한이 없습니다!`);
        error.name='ForbiddenError';
        next(error);
    }
    const user = req.user;

    return res.status(200).json({Message:"코드 검증 완료"});
});

export default router;
