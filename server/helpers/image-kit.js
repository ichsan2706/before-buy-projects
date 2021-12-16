const FormData = require('form-data')
const axios = require('axios')

async function imageKit(req, res, next) {

    if(!req.file) {
        next({name: "image null"})
    } else {
        if(req.file.size > 255000) {
            next({name: "data is too large"})
        } else {
            const form = new FormData()
            form.append('file', req.file.buffer.toString('base64'))
            form.append('fileName', req.file.originalname)

            const privateKey = new Buffer.from(process.env.IMAGE_KIT + ':').toString('base64')
            const uploader = await axios({
                method: 'POST',
                url: 'https://upload.imagekit.io/api/v1/files/upload',
                data: form,
                headers: {
                    ...form.getHeaders(),
                    Authorization: `Basic ${privateKey}`
                }
            })
            req.body.avatar = uploader.data.url
            next()
        }
    }
}

module.exports = imageKit