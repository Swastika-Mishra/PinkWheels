//use yarn add instead of npm i
//password - SEmsxN16CfRMZd6p
require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');
const expressLayout = require('express-ejs-layouts');
const port = process.env.PORT || 3000;
const session = require('express-session');
const flash = require('express-flash');
const MongoStore = require("connect-mongo");
const passport = require('passport');

//database connection
const url = 'mongodb+srv://mishraswastika05:SEmsxN16CfRMZd6p@passengers.2tmj7fy.mongodb.net/?retryWrites=true&w=majority&appName=Passengers';
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', function (){
    console.log("Database Connected...");
})
.on('error',function (err){
    console.log(err);
});

//passport config
const passportInit = require('./app/config/passport')
passportInit(passport)

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: MongoStore.create({
        mongoUrl:url
    }),
    saveUninitialized: false,
    cookie: {maxAge: 1000*60*60*24} //24 hours
}))
app.use(passport.initialize())
app.use(passport.session())

//flash
app.use(flash())

//assets
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}))
//app.use(express.json())

app.use(expressLayout);
app.set('views', path.join(__dirname, '/resources/views/'));
app.set('view engine','ejs');

require('./routes/web')(app);
app.get('/dashboard',(req,res)=>{
    res.render('dashboard')
})
// app.use((req, res) => {
//     res.status(404).render("errors/404");
// });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}...`);
});

