const jwt = require('jsonwebtoken');

const auth = (req, res, next) =>{
    try {
        const token = req.header("Authorization");
        if(!token) {
            return res.status(400).json({msg: "Autenticação Invalida!"});
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_PASSWORD, (err, user) =>{
            if(err) {
                return res.status(400).json({msg: "Autenticação Invalida!"});
            }

            req.user = user;
            next();
        })
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
}

module.exports = auth;