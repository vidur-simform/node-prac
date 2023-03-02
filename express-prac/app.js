const http = require('http');
const express = require('express');

//console
const log = console.log;


const app = express();
app.use('/',(req,res,next)=>{
    log(req.url);
    log('In mw 1 before next');
    next();
    console.log("In mw 1 after next");
    res.send("<h1>Hiii</h1>");

});

app.use((req,res,next)=>{
    log('In mw 2');
    // let st = Date.now();
    // let diff = 400;
    // let end = st + diff;
    // while(end > st){
    //     st = Date.now();
    // }
});

app.listen(4000);