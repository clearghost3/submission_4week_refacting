import express from "express";

//middlewares
import { prisma } from "../utils/prisma/index.js";
import authMiddlware from "../middlewares/auth.middlware.js";

import jwt from "jsonwebtoken";
import bcrypt, { compareSync } from "bcrypt";


const router = express.Router();

console.log("<===Applyed adminaccount.Router===>");


const AccessTokenKey = "first_token";
const RefreshTokenKey = "second_token";

//매니저 로그인 router====================
router.get("/m-log-in", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email||!password) {            //유효성 검사
        return res.status(401).json({ErrorMessage:"로그인을 위해 비밀번호나 이메일을 입력해주세요!"});
    }             

    const user = await prisma.users.findFirst({
      where: {
        email: email,
      },
    });
  
    if (!user)
      return res
        .status(400)
        .json({ ErrorMessage: "해당 계정이 존재하지 않습니다" });
  
    if (!(await bcrypt.compare(password, user.password)))
      return res.status(400).json({ ErrorMessage: "비밀번호가 틀립니다." });
  
    const userinfo = await prisma.userinfos.findMany({
      where: {
        Userid: user.userid,
      },
    });
  
    const token = jwt.sign(
      {
        userid: user.userid,
      },
      AccessTokenKey,
      { expiresIn: "15m" }
    );
  
    res.cookie("authorization", `manager ${token}`,{expiresIn:'15m'});
  
    return res.status(200).json({ Message: "성공적으로 로그인 되었습니다!" });
  
  });


  export default router;