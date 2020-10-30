const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const like = new Schema({
    user: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

const comment = new Schema({
    user: { type: String, required: true },
    fullname: { type: String, required: true },
    comment: { type: String, required: true },
    createdDate: { type: Date, default: Date.now }
})

const publication = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    image: { type: String, required: true },
    owner: { type: String, required: true },
    likes: [
        like
    ],
    comments: [
        comment
    ],
    published: { type: Boolean, default: true },
    createdDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Like', like)
// module.exports = mongoose.model('Comment', comment)
module.exports = mongoose.model('Publication', publication)