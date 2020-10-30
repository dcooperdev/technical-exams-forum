const express = require('express')
const router = express.Router()
const isAuthenticated = require('../auxiliary/authentications.auxiliary').isAuthenticated
const isAdmin = require('../auxiliary/authentications.auxiliary').isAdmin
const publication = require('../controller/publications.controller')

router.get('/', async ( req,res ) => {
    try {
        const { id } = req.headers
        console.log( id )
        if ( id ) {
            const result = await publication.getPublicationById( id )

            res.status(200).json(
                result
            )
        } else {
            const result = await publication.getPublicationsList();

            res.status(200).json(
                result
            )
        }
        
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})

router.post('/', isAuthenticated, async ( req,res,next ) => {
    console.log({ body: req.body });
    try {
        const { title, body, image } = req.body
        const newPublication = await publication.createPublication( title, body, image, req.user.username_email )

        res.status(200).json(
            newPublication
        )
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})
router.put('/', isAuthenticated, async ( req,res,next ) => {

    try {
        const { id, title, body, image, published } = req.body
        const updatePublication = await publication.updatePublication( id, title, body, image, published, req.user.username_email )

        if ( !updatePublication ) {
            res.status(401).json({
                message: 'You not are the owner of this Article!'
            })
        } else {
            res.status(200).json(
                updatePublication
            )
        }
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})

router.delete('/', isAuthenticated, isAdmin, async ( req,res ) => {
    
    try {
        const { id, state } = req.headers
        const publications = await publication.unpublish( id, state )

        res.status(200).json(
            publications
        )
    } catch( error ) {
        res.status(500).json(
            error
        )
    }
})

module.exports = router