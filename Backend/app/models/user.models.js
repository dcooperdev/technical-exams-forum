const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const auth = require('../../config/auth.config')

const Schema = mongoose.Schema;

const user = new Schema({
    complete_name: { type: String, required: true },
    username_email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    rol: { type: String, required: true, default: 'user' },
    createdDate: { type: Date, default: Date.now }
})

user.pre("save", async function(next) {
    let user = this
    if(!user.isModified("password"))
        return next()

    user.password = await bcrypt.hashSync(user.password, process.env.BCRYPT_SALTS || auth.BCRYPT_SALTS)
    next()
});

/* No sirve porque cuando pido el usuario para hacer el login no trae el password para comparar T.T
user.methods.toJSON = function() {
    let user = this.toObject();
    delete user.password;
    return user;
}
*/

module.exports = mongoose.model('User', user)