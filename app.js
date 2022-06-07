const express = require('express');


//MODELS
=======
//PACKAGES
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');




//ROUTERS
const usersRouter = require('./routes/users');
const mangaRouter = require('./routes/mangas');


//CREATING APP OBJECT
const app = express();

//CSS AND FRONT-END JS GOES IN THIS FILE IN SUB-DIRECTORIES.
app.use(express.static('./public'));

//SETTINGS
app.set("view engine", "pug");
app.use(express.urlencoded({ extended: false }));



// const SequelizeStore = require('connect-session-sequelize')

// PERSISTING USER STATE
const session = require('express-session');
const { sessionSecret } = require('./config');

// RESTORING USER FROM SESSION
const { restoreUser } = require('./auth');

//ROUTER USE
app.use('/users', usersRouter);
app.use('/mangas', mangaRouter);

// RESTORING USER FROM SESSION
app.use(restoreUser);

app.use(morgan('dev')); // should we use this?

// PERSISTING USER STATE
app.use(cookieParser(sessionSecret));
app.use(session({
  name: 'reading-list.sid',
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false,
}));

//MIDDLEWARE
// app.use(
//   session({
//     secret: superSecret,
//     store,
//     saveUninitialized: false,
//     resave: false,
//   })
// )

// create Session table if it doesn't already exist
// store.sync();





//ROUTE HANDLERS//
//req and the res are given to us by express.
//req has all of the request info from forms and stuff
//and the res is what we give it in the cb below.
app.get('/', (req, res) => {
  //send is a built-in response method.
  res.render('home', {
    //THIS OBJECT IS THE BRIDGE BETWEEN OUR FRONTEND AND BACKEND. MOST IMPORTANT THING.
    sentence: "bobus moment"
  })
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('errorAll');
});



app.all('*', (req, res) => {
  res.render('errorAll', {
    error: "bruh are you fr rn"
  })
})

module.exports = app;
