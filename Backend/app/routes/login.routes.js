const express = require('express')
const router = express.Router()
const Login = require('../controller/login.controller')

router.get('/', async ( req,res ) => {
})
router.post('/', async ( req,res ) => {
    
    try {
        const { username_email, password } = req.body
        console.log(username_email, password)
        const token = await Login.authenticateUser( username_email, password )

        res.status(200).json(
            token
        )
    }catch( err ) {
        res.status(401).json(err)
    }

})

module.exports = router