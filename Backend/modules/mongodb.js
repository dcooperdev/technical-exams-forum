const mongoose = require('mongoose')

mongoose.connect( process.env.MONGODB_URI || 'mongodb://localhost:27017/forum-evaluation',
                  { retryWrites: false, useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false },
                    ( err, res ) => {

    if ( err ) throw err

    console.log( `Mongodb is running!!!` )

})

mongoose.set('useCreateIndex', true);

module.exports = {
    mongoose
}