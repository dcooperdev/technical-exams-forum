const Comment = require('../models/publication.models')

const createComment = async ( user, fullname, comment, publication ) => {
    return await Comment.findOneAndUpdate(
        {
            _id: publication,
        },
        {
            $addToSet: {
                comments: {
                    user,
                    fullname,
                    comment
                }
            }
        },
        { safe: true, upsert: true, new: true }
    )
}

module.exports = {
    createComment
}