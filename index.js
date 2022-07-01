//기본모듈

const http = require('http');

http.createServer();

//사용자 정의 모듈
const math = require('./math.js');

const result = math.sum(1,2);

//console.log(result);

//readFileSync (동기)
const fs = require('fs');

//const data = fs.readFileSync('./data.txt', 'utf-8')

//readFile (비동기) - 선호
const data = fs.readFile('./data.txt', 'utf-8', function(err,data){
    console.log(data);
});