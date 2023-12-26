const jwt = require('jsonwebtoken');
const { jwtDecode } = require('jwt-decode');

const authorization = (req, res, next) => {
    const token = req.headers.authorization;
    const user_id = jwtDecode(token).sub;
    req.user_id = user_id;

    if (token && token.startsWith("Bearer ")) {
        next();
    } else {
        res.status(401).json({ error: "Unauthorized - Invalid or missing token" })
    }
}

module.exports = { authorization };