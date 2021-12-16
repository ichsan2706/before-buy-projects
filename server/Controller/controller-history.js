const {history} = require('../models')



class ControllerHistory {
    static history(req, res, next) {
        history.findAll({
            where: {userId: req.userId}
        })
        .then((data) => {
            console.log(data);
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = ControllerHistory