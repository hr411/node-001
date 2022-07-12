const express = require('express');
const router = express.Router();

var users = [
    {id: 1, name: 'alice'},
    {id: 2, name: 'bek'},
    {id: 3, name: 'chris'} 
 ];  

router.get('/', (req, res) => {
    req.query.limit = req.query.limit || 10; //limit 없으면 10 할당
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)){
        return res.status(400).end();
    }
    res.json(users.slice(0, limit));
});

router.get('/:id', function(req, res) {
    const id =  parseInt(req.params.id, 10);
    //console.log('### id', id);
    if (Number.isNaN(id)) return res.status(400).end();
    
    const user = users.filter((user) => { return user.id === id })[0];
    //console.log('### user', user)
    if(!user) return res.status(404).end();
    
    res.json(user);
});

router.delete('/:id', (req,res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    users = users.filter((user)=> { 
        return user.id !== id
    });
    res.status(204).end();
});

router.post('/', (req, res)=> {
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

router.put('/:id', (req, res)=> {
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

module.exports = router;
