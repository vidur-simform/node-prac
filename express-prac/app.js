const path = require("path");
const express = require("express");

const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//importing models
const User = require("./models/user");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//configuring view engine and path
app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");
const homeController = require("./controllers/home");

app.use((req, res, next) => {
    User.findById(1)
        .then((user) => {
            req.body.user = user; //adding dummy user to request
            next();
        })
        .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);
app.get("/", homeController.getHome);

//invalid path request
app.use(errorController.get404);


mongoose
    .connect(
        "mongodb+srv://vidur:Vidur_Atlas012@cluster0.io1qt3s.mongodb.net/shop?retryWrites=true&w=majority"
    )
    .then((result) => {
        User.findOne().then((user) => {
            if (!user) {
                const user = new User({
                    name: "test",
                    email: "test@abc.com",
                    cart: {
                        items: [],
                    },
                });
                user.save();
            }
        });
        app.listen(3000, () => {
            console.log("Server Started...");
        });
    })
    .catch((err) => {
        console.log(err);
    });
