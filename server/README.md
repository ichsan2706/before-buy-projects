# individual-project
# BeforeBuy
# Sandbox ecommerce games using midtrans

BeforeBuy adalah aplikasi dimana user dapat register/login kemudian saat di home page, 
setiap user dapat melakukan add wishlist dan transaksi melalui midtrans.

## Features

- Register & Login.
- Create & Delete wishlist.
- Update profile using image-kit (upload avatar) & get notification by nodemailer.
- Third party API games to get list of 20+ games.
- User can navigate profile to see their wishlist, history payment and account information.


## Package yang digunakan


- nodemailer
- midtrans
- rest API (list games & random avatar picture)
- image-kit (upload image)
- [node.js] - evented I/O for the backend
- [Express] - fast node.js network app framework [@tjholowaychuk]


## Installation

Silahkan lakukan npm install untuk install semua package yang ada.

```sh
npm install 
```
## Run
```sh 
Server
nodemon app.js 
```
```sh 
Client
npm run serve
```