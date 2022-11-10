const express = require('express')
const routes = express.Router()
const userController = require('./controllers/userController')

routes.post('/user/register', userController.register)
routes.post('/user/login', userController.login)

module.exports = routes