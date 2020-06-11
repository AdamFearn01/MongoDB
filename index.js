const express = require('express');
const hbs = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRouter = require('./routes/user.js');

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

app.use('/', userRouter);

app.listen(3000, () => {
    console.log('listening on port 3000')
});