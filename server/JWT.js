const { sign, verify } = require("jsonwebtoken")

const createTokens = (user) => {
    const accessToken = sign({username: user.username}, "jwtsecret", {expiresIn: "1h"});
    
    return accessToken;
}

const validateToken = (req, res, next) => {
    const accessToken = req.cookies["access-token"]
    
    if(!accessToken){
        return(res.status(400).json({error: "User not Authenticated!"}))
    }

    try{
        const validToken = verify(accessToken, "jwtsecret")
        if(validToken){
            req.authenticated = true
            next()
        }
    }catch(err){
        res.clearCookie("access-token");
    }
}

module.exports={createTokens, validateToken}

