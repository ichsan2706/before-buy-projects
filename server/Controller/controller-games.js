const axios = require('axios')

class Controller{
    static gameList(req, res, next) {
      axios({
        method: 'get',
        url: `https://api.rawg.io/api/games?key=c97772a04b5d489683a97366f2207b6a`,
    })
    .then(({data}) => {
        res.status(200).json(data)
    })
    .catch((err) => res.status(400).json(err))
    }

    static genreList(req, res, next) {
      axios({
        method: 'GET',
        url: 'https://api.rawg.io/api/genres',
        params: {
          key: `c97772a04b5d489683a97366f2207b6a`
        }       
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => res.status(400).json(err))
    }

    static gameDetails(req, res, next) {
      let {id} = req.params
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games/${id}`,
        params: {
          key: `c97772a04b5d489683a97366f2207b6a`
        }
      })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch((err) => res.status(400).json(err))
    }

    static genreDetails(req, res, next) {
      let {id} = req.params
      axios({
        method:'GET',
        url: `https://api.rawg.io/api/genres/${id}`,
        params: {
          key: `c97772a04b5d489683a97366f2207b6a`
        }
      })
      .then((data) => {
        res.status(200).json(data)
      })
      .catch((err) => res.status(400).json(err))
    }

    static gameTrailer(req, res, next) {
      let {id} = req.params
      axios({
        method: 'GET',
        url: `https://api.rawg.io/api/games/${id}/movies`,
        params: {
          key: `c97772a04b5d489683a97366f2207b6a`
        }
      })
      .then(({data}) => {
        res.status(200).json(data)
      })
      .catch((err) => res.status(400).json(err))
    }
}


module.exports = Controller