const Like = require('../models/publication.models')

const createLike = async ( publication, user ) => {
    return await Like.findOneAndUpdate(
        {
            _id: publication,
        },
        {
            $addToSet: {
                likes: {
                    user
                }
            }
        },
        { safe: true, upsert: true, new: true }
    )
}

module.exports = {
    createLike
}