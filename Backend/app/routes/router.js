const express = require('express')
const api     = express.Router()
const routes = require('./index')

api.use('/api/v1/login', routes.login)
api.use('/api/v1/signup', routes.signup)
api.use('/api/v1/publication', routes.publication)
api.use('/api/v1/like', routes.like)
api.use('/api/v1/comment', routes.comment)

module.exports = api;
