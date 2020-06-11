const {Schema, model} = require('mongoose');

let user = new Schema({
    userName: {type: String, required: true, unique: false},
    email: {type: String, required: true, unique: false},
    password: {type: String, required: true, unique: false}
}, {
    toObject: {virtuals: true}
});

user.statics.findUser = async function(userName) {

    let user = await this.findOne({userName: body.userName});

    if (!user) {
        return false;
    }

    if (user.password != body.password) {
        return false;
    }

    return user;
    //console.log(this); // user Schema
}

module.exports = model('user', user);