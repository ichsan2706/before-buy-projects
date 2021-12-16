const {User, favorite, history} = require('../models')
const axios = require('axios')

function addWishlist(req, res, next) {
    let {gameId} = req.params
    console.log(req.params.gameId, 'datanya');
    favorite.findOne({
        where: {gameId: gameId}
    })
    .then((data) => {
        if(data) {
            next({name: 'item exists'})
        } else {
            next()
        }
    })
    .catch(err => {
        next(err)
    })
}

function editauthorization(req, res, next) {
    let userId = req.params.userId

    User.findByPk(userId)
        .then((user) => {
            if(user) {
                req.email = user.email
                next()
            } else {
                next({name: 'not authorized'})
            }
        })
        .catch((err) => {
            console.log(err, 'disini');
            next(err)
        })
}

function deleteauthorization(req, res, next) {
    let gameId = req.params.gameId

    favorite.findOne({
        where: {gameId: gameId}
    })
    .then((data) => {
        if(data) {
            console.log('lanjut delete');
            next()
        } else {
            console.log(`data ga ada`);
            next({name: 'item_404'})
        }
    })
    .catch(err => {
        console.log(`eror authorization`);
        console.log(err);
        next(err)
    })
}

function payment(req, res, next) {
    let id = req.params.id

    if(id) {
        axios({
            method: 'GET',
            url: `https://api.rawg.io/api/games/${id}`,
            params: {
              key: `c97772a04b5d489683a97366f2207b6a`
            }
          })
          .then((data) => {
            req.product = data
            next()
          })
          .catch((err) => res.status(400).json(err))
        
    } else {
        next({name: 'item_404'})
    }
}

module.exports = {addWishlist, editauthorization, deleteauthorization, payment}