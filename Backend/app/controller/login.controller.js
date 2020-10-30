const User = require('../models/user.models')
const bcrypt = require('bcrypt')
const jws = require('../../modules/jsonwebtokens')

const authenticateUser = async ( username_email, password ) => {

    return new Promise( async (resolve, reject) => {

        let user = await User.findOne({username_email}).select('+password')

        if ( user  ) {

            const match = await bcrypt.compare(password, user.password)
    
            user = user.toObject();
            delete user.password;
    
            if ( match ) {
    
                resolve(jws.tokenize( user ))
    
            }
            
        }

        reject('Username or password incorrect!')

    })

}

module.exports = {
    authenticateUser
}