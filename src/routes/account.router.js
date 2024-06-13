import express from "express";

//middlewares
import { prisma } from "../utils/prisma/index.js";
import authMiddlware from "../middlewares/auth.middlware.js";

import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt";

//import layer
import { UsersRepository } from "../Layer/DataAccess/Users.repository.js";
import { UsersService } from "../Layer/Services/Users.service.js";
import { UsersController } from "../Layer/Controller/Users.controller.js";

const router= express.Router();

const usersRepository=new UsersRepository(prisma);
const usersService=new UsersService(usersRepository);
const usersController=new UsersController(usersService);

console.log("<===Applyed account.Router===>");

router.post("/", async (req, res, next) => {

});


// const router = express.Router();

// console.log("<===Applyed account.Router===>");

// const AccessTokenKey = "first_token";
// const RefreshTokenKey = "second_token";

// //회원 가입 router====================
// router.post("/set-in", async (req, res, next) => {
//   const { email, password, name, age, gender, profilimage, role } = req.body;
//   if (!email || !password || !name || !gender)
//     return res.status(400).json({
//       Message: "필수적인 정보를 입력해주세요!",
//     });

//   //같은 이메일이 있는지 확인
//   const isExistemail = await prisma.users.findFirst({
//     where: {
//       email: email,
//     },
//   });

//   if (isExistemail) {
//     return res.status(403).json({
//       Message: "이미 존재하는 계정입니다. --계정생성 불가능",
//     });
//   }

//   //비밀번호 암호화
//   const hashedpassword = await bcrypt.hash(password, 10); //비밀번호 암호화, 10번 복호화 과정을 거침    //비동기이기에 자기자신 참조 불가

//   //트랜잭션 만듦 //격리수준:commit된 이후에 읽기 가능
//   const [user, info] = await prisma.$transaction(
//     async (tx) => {
//       const user = await tx.users.create({
//         data: {
//           email,
//           password: hashedpassword,
//           role,
//         },
//       });

//       const info = await tx.userinfos.create({
//         data: {
//           Userid: user.userid,
//           name: name,
//           age: +age,
//           gender,
//           profilimage,
//         },
//       });

//       return [user, info];
//     },
//     {
//       isolationLevel: Prisma.TransactionIsolationLevel.ReadCommitted,
//     }
//   );

//   if (role === "MANGER") {
//     console.log(`관리자 계정(id:${user.userid})이 생성되었습니다`);
//     return res
//       .status(200)
//       .json({ Message: "성공적으로 관리자 계정이 생성되었습니다!" });
//   }
//   return res.status(200).json({ Message: "성공적으로 계정이 생성되었습니다!" });
// });

// //로그인 router====================
// router.get("/log-in", async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await prisma.users.findFirst({
//     where: {
//       email: email,
//     },
//   });

//   if (!user)
//     return res
//       .status(400)
//       .json({ ErrorMessage: "해당 계정이 존재하지 않습니다" });

//   if (!(await bcrypt.compare(password, user.password)))
//     return res.status(400).json({ ErrorMessage: "비밀번호가 틀립니다." });

//   const userinfo = await prisma.userinfos.findMany({
//     where: {
//       Userid: user.userid,
//     },
//   });

//   const token = jwt.sign(
//     {
//       userid: user.userid,
//     },
//     AccessTokenKey,
//     { expiresIn: "15m" }
//   );

//   res.cookie("authorization", `Bearer ${token}`, { expiresIn: "15m" });

//   //관리자 검증 확인
//   if (user.role === "MANGER") {
//     console.log(`관리자 계정(id:${user.userid})이 로그인 하였습니다.`);
//     return res
//       .status(200)
//       .json({ Message: "관리자 계정으로 성공적으로 로그인 되었습니다!" });
//   }

//   return res.status(200).json({ Message: "성공적으로 로그인 되었습니다!" });
// });

// //본인의 계정 정보 조회 router ====================
// router.get("/myinfo", authMiddlware, async (req, res, next) => {
//   const userid = req.user.userid; //authMiddlware에서 req에 전달한 userid를 사용함

//   const userinfo = await prisma.userinfos.findFirst({
//     where: {
//       Userid: +userid,
//     },
//     select: {
//       name: true,
//       age: true,
//       gender: true,
//       createdAt: true,
//       updatedAt: true,
//     },
//   });

//   return res.status(200).json({ userinfo });
// });



// //로그아웃 router ====================
// router.get("/logout", (req, res) => {
//   res.clearCookie("authorization");
//   return res.status(200).json({ Message: "성공적으로 로그아웃 되었습니다!" });
// });

export default router;
