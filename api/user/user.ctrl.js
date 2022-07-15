//api 로직
const models = require('../../models');

const index = (req, res) => {
    req.query.limit = req.query.limit || 10; //limit 없으면 10 할당
    const limit = parseInt(req.query.limit, 10);
    if (Number.isNaN(limit)){
        return res.status(400).end();
    }

    models.User
        .findAll({
            limit: limit
        }).then(users=> {
            res.json(users);
        })
}

const show = function(req, res) {
    const id =  parseInt(req.params.id, 10);
    //console.log('### id', id);
    if (Number.isNaN(id)) return res.status(400).end();
    
    //const user = users.filter((user) => { return user.id === id })[0];
    //console.log('### user', user)

    models.User
        .findOne({
            where: {id}
        }).then(user=>{
        if(!user) return res.status(404).end();
        res.json(user);
    });
};

const destroy = (req,res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    // users = users.filter((user)=> { 
    //     return user.id !== id
    // });

    models.User.destroy({
        where: {id}
    }).then(()=> {
        res.status(204).end();
    });   
};

const create = (req, res)=> {
    //console.log('### req.body.name', req.body.name)
    const name = req.body.name;
    //console.log('### name', name)

    if(!name) return res.status(400).end();
    // const isConflic = users.filter((user) => { 
    //     return user.name === name
    // }).length;
    //if(isConflic) return res.status(409).end();

    // const id = Date.now();
    // const user = {id, name};
    // users.push(user);
    
    models.User.create({
        name
    }).then(user=> {
        res.status(201).json(user);
    }).catch(err=> {
        // console.log(err);
        if(err.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).end()
        }
        res.status(500).end()
    })
};

const update = (req, res)=> {
    const id = parseInt(req.params.id, 10);
    if(Number.isNaN(id)) return res.status(400).end();

    const name = req.body.name;
    if(!name) return res.status(400).end();
    
    // const isConflict = users.filter((user)=> {
    //     return user.name === name
    // }).length;
    // if(isConflict) return res.status(409).end();

    // const user = users.filter((user)=>{
    //     return user.id === id
    // })[0];
    // if(!user) return res.status(404).end();
    models.User.findOne({
        where: {id}
    }).then(user=> {
        if(!user) return res.status(404).end();
        user.name = name;
        user.save()
            .then(_=> {
                res.json(user);
            }).catch(err=> {
                // console.log(err);
                if(err.name === 'SequelizeUniqueConstraintError'){
                    return res.status(409).end()
                }
            })

    })
    
};

module.exports = {
    index, show, destroy, create, update
};