const express = require('express')
const routes = express.Router()
const userController = require('./controllers/userController')
const authController = require('./controllers/authController')

routes.post('/user/register', userController.register)
routes.post('/user/login', userController.login)
routes.post('/user/validate', userController.validateToken)

module.exports = routes