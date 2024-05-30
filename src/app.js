import express from 'express';
import cookieParser from 'cookie-parser';

import accountRouter from "./routes/account.router.js"

//middlewares
import authMiddlware from './middlewares/auth.middlware.js';
import errorhandlerMiddleware from './middlewares/errorhandler.middleware.js';

const app=express();
app.use(cookieParser());

//라우터에서 사용자의 req.body에 접근할 수 있게 해주는 미들웨어
app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.use("/api",[accountRouter]);

const PORT=3019;

app.use(errorhandlerMiddleware);

app.listen(PORT,()=>{
    console.log(`${PORT}번 포트에서 서버가 열렸습니다.`);
});