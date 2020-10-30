const express = require('express')
const router = express.Router()
const Comment = require('../controller/comment.controller')
const isAuthenticated = require('../auxiliary/authentications.auxiliary').isAuthenticated

router.get('/', isAuthenticated, async ( req,res ) => {
    res.status(200).json({
        data: req.user
    })
})

router.post('/', isAuthenticated, async ( req,res,next ) => {
    
    try {
        const { fullname, publication, comment } = req.body
        const newComment = await Comment.createComment( req.user._id, fullname, comment, publication )

        res.status(200).json(
            newComment
        )
    }catch( err ) {
        res.status(500).json(err)
    }

})

router.delete('/', async ( req,res ) => {
})

module.exports = router