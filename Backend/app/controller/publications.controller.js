const Publication = require('../models/publication.models')

const getPublicationsList = async () => {
    return await Publication.find({ published: true })
}

const getPublicationById = async ( id ) => {
    return await Publication.findOne({ _id: id, published: true })
}

const createPublication = async (title, body, image, owner) => {

    const publication = await Publication.create({
        title,
        body,
        image,
        owner
    })

    return publication

}

const updatePublication = async (id, title, body, image, published, user) => {
    const pub = await Publication.findOne({ _id: id })
    console.log({owner: pub.owner, user});
    
    if ( pub.owner === user ) {

        const update = await Publication.findByIdAndUpdate(
            id,
            { title, body, image, published },
            { safe: true, upsert: true, new: true }
        )
        return update
    }

    return false
}

const unpublish = async ( id, state ) => {

    const publication = await Publication.findByIdAndUpdate(
        id,
        {
            published: state
        },
        { safe: true, upsert: true, new: true }
    )
    return publication

}

module.exports = {
    getPublicationsList,
    getPublicationById,
    createPublication,
    updatePublication,
    unpublish
}