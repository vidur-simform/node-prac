const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');

const app = express();
app.get('/',(req,res,next)=>{
    res.send("HI");
});
app.listen(3000,()=>{
    console.log("Server started....")
});