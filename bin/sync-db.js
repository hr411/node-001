const models = require('../models');

module.exports = ()=> {
    const options = {
        force: process.env.NODE_ENV === 'test' ? true : false //force: true - 서버 기동시 DB 초기화
    };
    return models.sequelize.sync(options); 
}