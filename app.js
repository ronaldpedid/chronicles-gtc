function initializeApp(db) {
    var express = require('express');
    var path = require('path');
    var favicon = require('serve-favicon');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');
    var bodyParser = require('body-parser');
    var methodOverride = require('method-override');
    var mongoMiddleware = require('./middleware/mongo');
    var backgroundSelectMiddleware = require('./middleware/background-select');
    var setUserOnLocalsMiddleware = require('./middleware/user-local');
    var session = require('express-session');
    var flash = require('express-flash');
    var moment = require('moment');
    var expressHandlebars = require('express-handlebars');
    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var User = require('./lib/models/User');
    var Signup = require('./lib/models/Signup');
    var MongoStore = require('connect-mongo')(session);
    var index = require('./routes/index');
    var users = require('./routes/users');
    var events = require('./routes/events');
    var games = require('./routes/games');
    var register = require('./routes/register');
    var login = require('./routes/login');
    var logout = require('./routes/logout');
    var about = require('./routes/about');
    var posts = require('./routes/posts');
    var caro = require('./routes/caro');
    var comments = require('./routes/comments');
    var secret = "Nibbieamylodgiduke1";
    var dashboard = require('./routes/dashboard');
    var privacy = require('./routes/privacy');
    var config = require('./config');
    var camp = require('./routes/camp');
    var tos = require('./routes/tos');
    var promise = require('promise');
    var spReport = require('./routes/spreport');
    // testing below, comment out or delete before push //
    var formidable = require('formidable');
    var fs = require('fs-extra');
    var  util = require('util');


    var app = express();
    app.db = db;

    passport.use(new LocalStrategy({
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            console.log('inside local strategy');
            User.findOne({username: username}, function (err, user) {
                if (err) {
                    console.log(err);
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username or password'});
                }
                user.comparePassword(password, function (err, isMatch) {
                    console.log(user);
                    if (err) {
                        return done(err);
                    } else if (isMatch) {
                        return done(null, user);
                    } else {
                        return done(null, false, {message: 'Incorrect username or password'});
                    }
                });
            });
        }
    ));
    passport.serializeUser(function (user, done) {
        console.log('serialize', user.id);
        return done(null, user.id)
    });
    passport.deserializeUser(function (id, done) {
        console.log('deserialize', id);
        User.findById(id, function (err, user) {
            if (err) {
                console.log('error in deserialize', err);
                return done(err);
            }
            done(null, user)
        });
    });

    var handleBars = expressHandlebars.create({
        layoutsDir: path.join(__dirname, 'views'),
        partialsDir: path.join(__dirname, 'views', 'partials'),
        defaultLayout: 'layout',
        extname: '.hbs',
        helpers: {
            formatDate: function (dateString) {
                return moment(dateString).format("dddd, MMMM D / h A");
            },
            setChecked: function (value, currentValue) {
                if (value == currentValue) {
                    return "checked"
                } else {
                    return "";
                }
            },
            toISOFormat: function (value) {
                return moment('value').format('YYYY-MM-DDThh:mm');
            }
        }
    });


    app.engine("hbs", handleBars.engine);
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'hbs');

    //starting the app.use section
    app.use(methodOverride("_method"));
    app.use(logger('dev'));
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(cookieParser());
    app.use(mongoMiddleware(config.mongo));
    app.use(backgroundSelectMiddleware());
    app.use(session({
        store: new MongoStore({url: config.mongo.connectionString}),
        secret: secret,
        maxAge: 60 * 60 * 1000, // ms; lasts for one hour
        resave: false,
        saveUninitialized: false
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(flash());
    app.use(setUserOnLocalsMiddleware());
    var authRouter = express.Router();
    authRouter.use(function (req, res, next) {
        if (req.isAuthenticated()) {
            return next()
        }
        res.redirect('/login');
    });

    //upload system code
    app.use(express.static(path.join(__dirname, 'uploads/')));

    authRouter.get('/upload', function(req, res){
        res.sendFile(path.join(__dirname, 'views/upload/upload.html'));
    });

    app.post('/upload', function(req, res){

        // create an incoming form object
        var form = new formidable.IncomingForm();

        // specify that we want to allow the user to upload multiple files in a single request
        form.multiples = true;

        // store all upload in the /upload directory
        form.uploadDir = path.join(__dirname, '/uploads/');

        // every time a file has been uploaded successfully,
        // rename it to it's orignal name
        form.on('file', function(field, file) {
            fs.rename(file.path, path.join(form.uploadDir, file.name));
        });

        // log any errors that occur
        form.on('error', function(err) {
            console.log('An error has occured: \n' + err);
        });

        // once all the files have been uploaded, send a response to the client
        form.on('end', function() {
            res.end('success');
        });

        // parse the incoming request containing the form data
        form.parse(req);

    });



    app.use('/', index);
    app.use('/login', login);
    app.use('/privacy', privacy);
    app.use('/tos/', tos);
    app.use('/posts/', posts);
    app.use('/camp/', camp);
    authRouter.use('/spreport/', spReport);
    authRouter.use('/register', register);
    authRouter.use('/users', users);
    authRouter.use('/events', events);
    authRouter.use('/events/create', events);
    authRouter.use('/about', about);
    authRouter.use('/dashboard', dashboard);
    authRouter.use('/games/', games);
    authRouter.use('/comments/', comments);
    authRouter.use('/caro/', caro);
    authRouter.use('/logout', logout);
    authRouter.use('/posts/create/', posts);
    app.use(authRouter);


// catch 404 and forward to error handler
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

// error handler
    app.use(function (err, req, res, next) {
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    });
    return app;
}

module.exports = initializeApp;
