const jwt = require('jsonwebtoken');
const privateKey = require('./constants').auth.privateKey;
const token = (payload) => {
    return jwt.sign(payload, privateKey);
};

const decode = (token) => {
    return jwt.verify(token, privateKey);
};

const authenticate = (req, res, next) => {
    let token = req.headers.authorization;
    if (token) {
        try {
            req.user = decode(token);
            return next();
        } catch (e) {
            console.log(`Error in authorization ${e}`)
        }
    }
    res.sendStatus(401);
};
module.exports = {authenticate, token, decode};