var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoMiddleware = require('./middleware/mongo');
var backgroundSelectMiddleware = require('./middleware/background-select');
// var newEventsMiddleware = require('./middleware/events-middleware');
var session = require('express-session');
var flash = require('express-flash');
var moment = require('moment');
var elasticsearch = require('elasticsearch');
var expressHandlebars = require('express-handlebars');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./lib/models/User');


var index = require('./routes/index');
var users = require('./routes/users');
var events = require('./routes/events');
var games = require('./routes/games');
var register = require('./routes/register');
var login = require('./routes/login');
var about = require('./routes/about');
var posts = require('./routes/posts');
var caro = require('./routes/caro');
var comments = require('./routes/comments');
var secret = "Nibbieamylodgiduke1";
var dashboard = require('./routes/dashboard');
passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: 'Incorrect username or password'});
            }
            user.comparePassword(password, function (err, isMatch) {
                if (err || !isMatch) {
                    return done(null, false, {message: 'Incorrect username or password'});
                } else {
                    return done(null, user);
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
        console.log(err, user);
        if (err) {
            return done(err);
        }
        return done(null, user)
    });
});
var app = express();

// view engine setup
var handleBars = expressHandlebars.create({
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views', 'partials'),
    defaultLayout: 'layout',
    extname: '.hbs',
    helpers: {
        formatDate: function (dateString) {
            return moment(dateString).format("dddd, MMMM D h A");
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

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(methodOverride("_method"));
app.use(logger('dev'));
app.use(passport.initialize());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(mongoMiddleware());
app.use(backgroundSelectMiddleware());
app.use(session({secret: secret, resave: false, saveUninitalized: true}));
app.use(flash());
app.use(passport.session());
var authRouter = express.Router();
authRouter.use(function (req, res, next) {
        console.log("we are here first.");
        next();
    },
    passport.authenticate('local', {
            failureRedirect: '/login',
            failureFlash: true
        }
    ), function (req, res, next) {
        console.log("we are here.");
        next();
    });


app.use('/', index);
app.use('/login', login);
authRouter.use('/users', users);
authRouter.use('/events', events);
authRouter.use('/about', about);
authRouter.use('/register', register);
authRouter.use('/dashboard', dashboard);
authRouter.use('/games/', games);
authRouter.use('/comments/', comments);
authRouter.use('/posts/', posts);
authRouter.use('/caro/', caro);
app.use('/', authRouter);


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

module.exports = app;
