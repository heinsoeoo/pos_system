const userRepository = require("../database/repository/user-repository");
const jwt = require('jsonwebtoken');
const { APP_SECRET } = require("../config");
const { APIError } = require("../utils/app-error");

module.exports = {
    
    async register(credentials) {
        const { name, username, password } = credentials;
        try {
            const user = await userRepository.createUser({name, username, password});
            const token = jwt.sign({id:user.id}, APP_SECRET);
            return { user: user, token:  token };
        } catch (err) {
            throw new APIError('Unable to create user');
        }
    },

    async login(credentials) {
        const {username, password} = credentials;
        // try {
            const user = await userRepository.findUser(username);
            console.log(user);
            if (user != null) {
                if (user.password == password) {
                    const token = jwt.sign({id:user.id}, APP_SECRET);
                    return { user: user, token:  token };
                }
                return 401;
            }
            return null;
        // } catch (err) {
        //     throw new APIError('Unable to create user');
        // }
    }

}