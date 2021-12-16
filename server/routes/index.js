const router = require('express').Router()
const routerGames = require('../routes/games')
const routerUser = require('../routes/user')
const routerProfile = require('./profile')
const routerMidtrans = require('./midtrans')
const authentication = require('../middleware/authentication')

router.use('/games', routerGames)
router.use('/user', routerUser)
router.use(authentication)
router.use('/profile', routerProfile)
router.use('/midtrans', routerMidtrans)


module.exports = router