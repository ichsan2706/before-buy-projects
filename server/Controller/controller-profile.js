const {User, favorite} = require('../models')
const nodemailer = require('nodemailer')

class ControllerProfile {

    static userProfile(req, res, next) {
        let userId = req.userId
        User.findOne({
            where: {id: userId},
            include: [favorite]
        }) 
            .then((user) => {
                res.status(200).json(user)
            })
            .catch(err => {
                next(err)
            })
    }

    static fetchFavorites(req, res, next) {
        let userId = req.userId

         favorite.findAll({
             where: {userId: userId}
         })
         .then((data) => {
             res.status(200).json(data)
         })
         .catch(err => next(err))
    }

    static addFavorite(req, res, next) {
        let userId = req.userId
        let {gameId, name, image, description} = req.body

        favorite.create({
            userId: userId,
            gameId: gameId,
            name: name,
            image: image,
            description: description
        })
        .then((data) => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log(err);
        })
    }

    static editProfile(req, res, next) {
        let id = req.params.userId
        let {username, avatar, email} = req.body
        let data = {username, avatar, email}
        let recipient_email = req.email
        User.update(data, {
            where: {id: id}
        })
            .then((data) => {
                console.log(data.email);

                let transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.SENDER_EMAIL,
                        pass: process.env.SENDER_PASS
                    }
                })

                let mailOption = {
                    from: process.env.SENDER_EMAIL,
                    to: recipient_email,
                    subject: `Notification after Updating profile`,
                    html: `Hi <b>${username}</b>!
                    <br>You updated your profile!
                    <br>Ignore this message if you are aware!
                    <br>
                    Thanks,
                    <br>
                    <b>Before Buy Official</b>
                    <br>
                    <img src='https://ik.imagekit.io/txvpianbu38/Custom_Size___1_fDgwzvFiVRB.png?updatedAt=1636042804895' width='100'/>`
                }

                transporter.sendMail(mailOption, (error, info) => {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(`email sent to ${recipient_email}`);
                    }
                })
                res.status(200).json({message: `success update profile user with id ${id}`})
            })
            .catch((err) => {
                console.log(err, 'disini');
                next(err)
            })
    }

    static deleteWishlist(req, res, next) {
        let gameId = req.params.gameId

        favorite.destroy({
            where: {gameId: gameId}
        })
        .then(() => {
            res.status(201).json({message: `success delete wishlist with id ${gameId}`})
        })
        .catch((err) => {
            console.log(err, 'error control');
            next(err)
        })
    }

}

module.exports = ControllerProfile