const config = require('../../config/auth.config')
const jwt = require('../../modules/jsonwebtokens')

const isAuthenticated = async ( req, res, next ) => {
    const { authorization } = req.headers

    if ( req.headers ){
        try{
            const user = await jwt.decode( getToken(authorization))
            req.user = user.data
            return next ? next() : true
        }
        catch(error){
            res.status(401).json(error)
        }
    }else
    return next ? res.status(401).json({ message: 'Please make sure your request has an Authorization header' }) : false

    next()
}

const isAdmin = async ( req, res, next ) => {

    const user = await jwt.decode( getToken(req.headers.authorization) )
    const { rol } = user.data

    if( rol === 'admin' ) {
        return next ? next() : true
    }
    return next ? res.status(401).json({ message: 'Please make sure your are an Administrator' }) : false
}

const getToken = ( data ) => {
    return data.split(' ')[1]
}

module.exports = {
    isAuthenticated,
    isAdmin
}