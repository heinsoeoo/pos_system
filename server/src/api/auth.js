const AuthController = require("../controllers/auth-controller");
const validator = require('json-request-validator');

const registerRule = {
    name: 'required',
    username: 'required',
    password: 'required'
}

const loginRule = {
    username: 'required',
    password: 'required'
}

module.exports = (app) => {

    const controller = AuthController;

    app.post('/register', validator(registerRule), async(req, res, next) => {
        const { name, username, password } = req.body;
        try{
            const data = await controller.register({ name, username, password });
            return res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    });

    app.post('/login', validator(loginRule), async(req, res, next) => {
        const { username, password } = req.body;
        try {
            const auth = await controller.login({username, password});
            switch(auth) {
                case null:
                    return res.status(400).json({error: "Invalid credentials"});
                case 401:
                    return res.status(400).json({error: "Invalid credentials"});
                default:
                    return res.status(200).json(auth);
            }
        } catch (err) {
            next(err);
        }
    });

    app.get('/me', async(req, res, next) => {
        try {
            const user = [];
            return res.status(200).json(user);
        } catch (err) {
            next(err);
        }
    });
}