const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const User = require('./models/userModel');

const app = express();

mongoose.connect('mongodb+srv://AdamFearn01:Password1234@cluster0-qmw2y.azure.mongodb.net/users?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});

//const mongoDB = require('./lib/mongoDB.js');

app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, "public")));

app.engine('.hbs', hbs({
    defaultLayout: 'layout',
    extname: '.hbs'
}));

app.set('view engine', '.hbs')

app.get('/', (req, res) => {
    res.render('signIn');
});

app.post('/signIn', async (req, res) => {
    if (!req.body.userName || !req.body.email || !req.body.password) {
        res.render('signup', {err: "Please provide all credentials"});
        return;	}
    let user = new User({
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
});

app.post('/login', (req, res) => {
    res.redirect('/profile');
});

app.get('/profile', async (req, res) => {
    let user = await User.findOne({userName: req.query.userName});
    if (user == null) {
        res.render('profile', {err: "that user doesn't exist"});
            return;
        }
            
    res.render('profile', {user: user.toObject()});
});

app.listen(3000, () => {
    console.log('listening on port 3000')
});