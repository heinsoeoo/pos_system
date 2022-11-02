const {db} = require('../connection');
const user = require('../models/user-model');
const userModel = user(db);
const { STATUS_CODES, APIError } = require('../../utils/app-error');

module.exports = {
    async createUser(credentials) {
        const {name, username, password} = credentials;
        try {
            const user = await userModel.create({
                name: name,
                username: username,
                password: password
            });

            return user;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to create user');
        }
    },

    async findUser(username) {
        try {
            const user = await userModel.findOne({where: {username: username}});
            return user;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to find user');
        }
    },

    async findByPk(id) {
        try {
            const user = await userModel.findByPk(id);
            return user;
        } catch (err) {
            throw new APIError('API Error', STATUS_CODES.INTERNAL_ERROR, 'Unable to find user');
        }
    }
}