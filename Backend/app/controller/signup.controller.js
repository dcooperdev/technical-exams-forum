const User = require('../models/user.models')
const jws = require('../../modules/jsonwebtokens')

const emailExists = async ( username_email ) => {
    
    return await User.findOne({ username_email });

}

const CreateUser = async ( complete_name, username_email, password ) => {

    return new Promise( async (resolve, reject) => {

        const exists = await User.findOne({ username_email });

        if ( exists ) {
            reject('Username exists')
        }

        let user = await User.create({
            complete_name,
            username_email,
            password
        })

        user = user.toObject();
        delete user.password;

        resolve(
            jws.tokenize(user)
        )

    })
}

module.exports = {
    emailExists,
    CreateUser
}