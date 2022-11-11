const express = require('express')
const routes = express.Router()
const userController = require('./controllers/userController')
const contactController = require('./controllers/contactController')
const authController = require('./controllers/authController')

routes.post('/user/register', userController.register)
routes.post('/user/login', userController.login)
routes.post('/user/validate', userController.validateToken)

routes.get('/contact/all', authController, contactController.read)
routes.get('/contact/one/:id', authController, contactController.getOne)
routes.post('/contact/register', authController, contactController.register)
routes.put('/contact/edit/:id', authController, contactController.edit)
routes.delete('/contact/delete/:id', authController, contactController.delete)

module.exports = routes