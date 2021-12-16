const midtransClient = require('midtrans-client');
const {history} = require('../models')

class Midtrans{
    static getToken(req, res, next) {
        let product = req.product

        let snap = new midtransClient.Snap({
            isProduction : false,
            serverKey : process.env.MIDTRANS_SERVER_KEY,
            clientKey : process.env.CLIENT_KEY
        });
        
        let parameter = {
            "transaction_details": {
                "order_id": `games-credit-${Math.round((new Date()).getTime() / 1000)}`,
                "gross_amount": 300000
            }, 
            "credit_card":{
                "secure" : true
            },
            "customer_details": {
                "first_name": "ichsan",
                "last_name": "rosaldi",
                "email": process.env.CUSTOMER_EMAIL,
                "phone": "08111222333"
            },
            "enabled_payments": 
            [
                "credit_card", 
                "mandiri_clickpay", 
                "cimb_clicks",
                "bca_klikbca", 
                "bca_klikpay", 
                "bri_epay", 
                "echannel", 
                "indosat_dompetku",
                "mandiri_ecash", 
                "permata_va", 
                "bca_va", 
                "bni_va", 
                "other_va", 
                "gopay",
                "kioson", 
                "indomaret", 
                "gci", 
                "danamon_online"
            ],
        };
        
        snap.createTransaction(parameter)
            .then((transaction)=>{
                // transaction token
                let transactionToken = transaction.token;
                res.status(200).json(transaction)
                console.log('transactionToken:',transactionToken);
                return history.create({
                    userId: req.userId,
                    product: product.data.name,
                    description: product.data.description,
                    image: product.data.background_image
                })
            })
            .then((data) => {
                res.status(201).json(data)
            })
            .catch(err => {
                console.log(err);
            })
        
    }
}

module.exports = Midtrans