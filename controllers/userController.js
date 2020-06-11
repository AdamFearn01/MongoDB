const User = require('../models/userModel');

exports.getSignIn = (req, res) => {
    res.render('signIn');
}

exports.createUser = async (req, res) => {
        if (!req.body.userName || !req.body.email || !req.body.password) {
            res.render('signIn', {err: "Please provide all credentials"});
            return;
        }

        const user = new User({
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
        });

        let isDuplicate = false;
    
        await user.save().catch((reason) => {
            
            res.render('signIn', {err: "A user with this user name or password already exists"});
            
            isDuplicate = true;
            return;
        });
        if (isDuplicate) {
            return;
        }
        res.redirect(`/profile/?userName=${req.body.userName}`)
    };

exports.getLogin = async(req, res) => {
    res.render('login');
}

exports.createLogin = async (req, res) => {
    if (!req.body.userName || !req.body.password) {
        res.render('login', {err: "Please provide all credentials"});
        return; 
    }

    if (User.findUser(req.body)) {
        res.render('login', {err: 'Invalid username or password'});
        return;
    }

    let user = User.findUser(req.body); //false || document

    if (user) {

        res.render('profile', {user: user.toObject()})
        return;
    }
        res.render('login', {err: "the entered password is incorrect"});

    let userT = await User.findOne({userName: req.query.userName});
    if (userT == null) {
        res.render('profile', {err: "that user doesn't exist"});
            return;
    } else {
        res.redirect(`/profile/?userName=${req.body.userName}`)
    };
}

exports.getProfile = async(req, res) => {
    res.render('profile')
};
