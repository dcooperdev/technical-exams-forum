const express = require('express')
const router = express.Router()
const signup = require('../controller/signup.controller')

router.get('/', async ( req,res ) => {

    const { username_email } = req.headers;

    try {
        const result = await signup.emailExists( username_email );

        if ( result === null ) {
            res.status(200).json({
                message: 'User doesn\'t exists'
            })
        } else {
            res.status(409).json({
                message: 'User exists'
            })
        }
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})
router.post('/', async ( req,res ) => { console.log(req.body);

    const { complete_name, username_email, password } = req.body;

    try {
        const result = await signup.CreateUser( complete_name, username_email, password );
        
        res.status(200).json(
            result
        )
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})

module.exports = router