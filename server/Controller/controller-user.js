const {compareHash} = require('../helpers/bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models')

class ControllerUser{
    static register(req, res, next) {
        let {username, email, password} = req.body
        let data = {username, email, password, avatar: `https://avatars.dicebear.com/api/avataaars/${username}.svg`}
        User.create(data)
            .then((data) => {
                res.status(201).json({Profile: data,"message":`user created`})
            })
            .catch((err) => {
                console.log(err);
                res.status(400).json({message: err.errors[0].message})
            })
    }

    static login(req, res, next) {
        let {email, password} = req.body

        User.findOne({
            where: {email: email}
        })
        .then((user) => {
            if(user && compareHash(password, user.password)) {
                let payload = {
                    id: user.id,
                    email: user.mail
                }
                const access_token = jwt.sign(payload, process.env.JWT_KEY)
                res.status(200).json({success: true, access_token, id: user.id})
            } else {
                next()
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({message: err.errors[0].message})
        })
    }
}

module.exports = ControllerUser