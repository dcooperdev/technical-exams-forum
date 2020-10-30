const express = require('express')
const router = express.Router()
const Like = require('../controller/like.controller')
const isAuthenticated = require('../auxiliary/authentications.auxiliary').isAuthenticated

router.post('/', isAuthenticated, async ( req,res,next ) => {
    console.log(req.body);
    
    try {
        const { publication } = req.body
        const like = await Like.createLike( publication, req.user._id )

        res.status(200).json(
            like
        )
    }catch( err ) {
        res.status(500).json(err)
    }

})

router.delete('/', async ( req,res ) => {
})

module.exports = router