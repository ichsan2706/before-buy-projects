const jwt = require('jsonwebtoken')
const {User} = require('../models')

function authentication(req, res, next) {
    if(!req.headers.access_token) {
        next({name: 'missing_access_token'})
    }

    try {
        const decoded = jwt.verify(req.headers.access_token, process.env.JWT_KEY)
        req.userId = decoded.id
        req.email = decoded.email

        User.findByPk(req.userId)
            .then((user) => {
                if(user) {
                    next()
                } else {
                    next({name: 'json_web_token_error'})
                }
            })
            .catch((err) => {
                next(err)
            })
    } catch (error) {
        next({name: 'invalid_token'})
    }
}





module.exports = authentication