const dotenv = require('dotenv');
dotenv.config();

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const csrf = require('csurf');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

//importing models
const User = require("./models/user");

const app = express();
const store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'session'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrf());
app.use(flash());

app.use((req, res, next) => {
    //locals means passed in views
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});


//configuring view engine and path
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

const errorController = require("./controllers/error");
const homeController = require("./controllers/home");

app.use((req, res, next) => {
    // throw new Error('Sync Dummy');
    if (!req.session.user) {
        return next();
    }
    //retrieving mongoose object to get methods because session object will only
    //have data not methods
    User.findById(req.session.user._id)
        .then(user => {
            if (!user) {
                return next();
            }
            req.body.user = user;
            next();
        })
        .catch(err => {
            next(new Error(err));
        });
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.use("/auth", authRoutes);

app.get("/", homeController.getHome);

//invalid path request
app.use(errorController.get404);

//middleware for error handling
// app.use((error, req, res, next) => {
//     // res.status(error.httpStatusCode).render(...);
//     // res.redirect('/500');
//     res.status(500).render('500', {
//       pageTitle: 'Error!',
//       path: '/500',
//       isAuthenticated: req.session.isLoggedIn
//     });
//   });

mongoose
    .connect(process.env.MONGODB_URI,
        { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
        app.listen(3000, () => {
            console.log("Server Started...");
        });
    })
    .catch((err) => {
        console.log(err);
    });
