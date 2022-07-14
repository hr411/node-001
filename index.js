var express = require('express');
var app = express();
var port = 3000;
var morgan =  require('morgan');
var bodyParse = require('body-parser');
var user = require('./api/user');

if (process.env.NODE_ENV !== 'test'){
    app.use(morgan('dev'));    
}

app.use(bodyParse.json()) // for parsing application/json
app.use(bodyParse.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/users',user);

module.exports = app;

/*
2XX: 자, 여기있어
200: 성공(success), GET, PUT
201: 작성됨(created), POST
204: 내용 없음 (No Conent), DELETE
4XX: 니가 문제임
400: 잘못된 요청 (Bad Request)
401: 권한 없음 (Unauthorized)
404: 찾을 수 없음 (Not found)
409: 충돌 (Conflict)
5XX: 내가 문제임
500: 서버 에러 (Interel server error)
*/
