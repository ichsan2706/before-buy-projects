const router = require('express').Router()
const ControllerGames = require('../Controller/controller-games')

router.get('/', ControllerGames.gameList)
router.get('/:id', ControllerGames.gameDetails)
router.get('/:id/movies', ControllerGames.gameTrailer)



module.exports = router