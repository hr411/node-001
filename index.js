const express = require('express');
const morgan = require('morgan'); //npm install
const app = express();

//미들웨어
function logger(req, res, next){
    console.log('i am logger');
    next();
}

function logger2(req, res, next){
    console.log('i am logger2');
    next();
}

function commonmw(req, res, next){
    console.log('commonmw');
    next(new Error('error ouccered'));
}

function errormw(err, req, res, next){
    console.log(err.message);

    next();
}

app.use(commonmw);
app.use(errormw);
app.use(morgan('dev')); 


app.listen(3000, function(){
    console.log('Server is running');
})
 