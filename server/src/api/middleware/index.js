const jwt = require('jsonwebtoken');
const { APP_SECRET } = require('../../config');
const userRepository = require('../../database/repository/user-repository');

const apiAuth = async(req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "");
        const decoded = jwt.verify(token, APP_SECRET);

        const user = await userRepository.findByPk(decoded.id);
        if (user != null) {
            req.token = token;
            req.user = user;
            next();
        } else {
            return res.status(401).json({error: "Unauthorized"});
        }
    } catch (err) {
        return res.status(401).json({error: "Unauthorized"});
    }
}

module.exports = apiAuth;