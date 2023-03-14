const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const sequelize = require('./utils/databaseSequelize');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//configuring view engine and path 
app.set('view engine','ejs');
app.set('views','views');

const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const homeController = require('./controllers/home');

app.use('/admin', adminRoutes); 
app.get('/',homeController.getHome);

//invalid path request
app.use(errorController.get404);

sequelize
.sync()
.then();


app.listen(3000,()=>{
    console.log("Server started...")
});