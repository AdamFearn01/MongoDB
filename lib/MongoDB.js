const fetch = require('node-fetch');

const getMongoDBinfo = async () => {
    let data = await fetch(``);
    return await data.json;
}

const sortMongoDBinfo = async () => {
    data = await getMongoDBinfo;
    let signin = {
        signup: data.signup,
        login: data.login,
        profile: data.profile
    }
    return signin;
}

module.exports = {
    sortMongoDBinfo
}