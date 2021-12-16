const router = require('express').Router()
const Midtrans = require('../Controller/controller-midtrans')
const {payment} = require('../middleware/authorization')

router.get('/:id', payment, Midtrans.getToken)


module.exports = router