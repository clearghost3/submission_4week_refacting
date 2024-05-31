export default function (err,req,res,next) {
    console.error(err);
    switch (err.name) {
        case 'ForbiddenError':
            return res.status(403).json({ErrorMessage:'사이트에 접근할 권한이 없습니다!'});
    }


    return res.status(500).json({Message:"서버에서 에러가 발생했습니다"});

}