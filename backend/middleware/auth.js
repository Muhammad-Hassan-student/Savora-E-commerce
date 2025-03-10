import jwt from 'jsonwebtoken'

const authUser = async (req, res, next) => {
    const {token} = req.headers;
     
    if(!token){
        return res.json({
            success: false,
            message: "Unauthorized, Please login again"
        })
    }
    try {
        const token_decode = await jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = token_decode.id;
        console.log(req.body.userId);
        next();
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message});
    }
}

export default authUser;