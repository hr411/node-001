var express = require('express');
const { reporters } = require('mocha');
var app = express();
var port = 3000;
var morgan =  require('morgan');
const { isExternal } = require('util/types');
const { runInNewContext } = require('vm');
var users = [
   {id: 1, name: 'alice'},
   {id: 2, name: 'bek'},
   {id: 3, name: 'chris'} 
];  
var bodyParse = require('body-parser');

app.use(morgan('dev'));
app.use(bodyParse.json()) // for parsing application/json
app.use(bodyParse.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.get('/users', (req, res) => {
    req.query.limit = req.query.limit || 10; //limit 없으면 10 할당
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

app.get('/users/:id', function(req, res) {
    const id =  parseInt(req.params.id, 10);
    //console.log('### id', id);
    if (Number.isNaN(id)) return res.status(400).end();
    
    const user = users.filter((user) => { return user.id === id })[0];
    //console.log('### user', user)
    if(!user) return res.status(404).end();
    
    res.json(user);
});

app.delete('/users/:id', (req,res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    users = users.filter((user)=> { 
        return user.id !== id
    });
    res.status(204).end();
});

app.post('/users', (req, res)=> {
    //console.log('### req.body.name', req.body.name)
    const name = req.body.name;
    //console.log('### name', name)

    if(!name) return res.status(400).end();
    //console.log('### users', users);
    const isConflic = users.filter((user) => { 
        return user.name === name
    }).length;
    //console.log('### users', users)
    if(isConflic) return res.status(409).end();

    const id = Date.now();
    const user = {id, name};
    users.push(user);
    res.status(201).json(user);
});

app.put('/users/:id', (req, res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    const isConflict = users.filter((user)=> {
        return user.name === name
    }).length;
    if(isConflict) return res.status(409).end();

    const user = users.filter((user)=>{
        return user.id === id
    })[0];
    if(!user) return res.status(404).end();

    user.name = name;

    res.json(user);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});

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
