const router = require('express').Router()
const ControllerProfile = require('../Controller/controller-profile')
const ControllerHistory = require('../Controller/controller-history')
const {addWishlist, editauthorization, deleteauthorization} = require('../middleware/authorization') 
const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const imageKit = require('../helpers/image-kit')

router.get('/', ControllerProfile.userProfile)
router.get('/favorites', ControllerProfile.fetchFavorites)
router.get('/history', ControllerHistory.history)
router.post('/favorite/:gameId', addWishlist, ControllerProfile.addFavorite)
router.put('/edit/:userId', editauthorization, upload.single('avatar'), imageKit, ControllerProfile.editProfile)
router.delete('/favorite/:gameId', deleteauthorization, ControllerProfile.deleteWishlist)

module.exports = router