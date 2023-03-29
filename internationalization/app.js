const path = require("path");
const express = require('express');
const { I18n, __ } = require('i18n');
const port = 9001;

const app = express();
const i18n = new I18n({
    locales: ['en', 'hi', 'gu'],
    directory: path.join(__dirname, 'translations'),
    defaultLocale: 'en'
});

// i18n initialization
app.use(i18n.init);

//if set in "Accept-Language" header then we don't require to use below middle
app.use((req, res, next) => {
    i18n.setLocale(req, req.headers["lang"]); // accessing language form lang header
    next();
});

app.get("/", (req, res, next) => {
    res.send({
        id: 1,
        message: res.__("MESSAGE"),
        data: res.__("DATA"),
    });
});

app.listen(port, () => {
    console.log("Server started on port:", port);
})