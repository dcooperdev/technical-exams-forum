const jwt = require('jsonwebtoken')
const auth = require('../config/auth.config')

const tokenize = async ( data ) => {
    return await jwt.sign({data}, auth.PRIVATE_KEY)
}

const decode = async( authorization ) => {
    return await jwt.verify(authorization, auth.PRIVATE_KEY)
}

module.exports = {
    tokenize,
    decode
}