const router = require('express').Router()
const ControllerUser = require('../Controller/controller-user')


router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router