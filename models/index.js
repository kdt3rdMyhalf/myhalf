'use strict';

// const fs = require('fs');
// const path = require('path');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const Sequelize = require('sequelize');
const config = require(__dirname + '/../config/config.json')['development'];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블 등록
// db.뭐시기 = require('./모델파일')(sequelize, Sequelize);
db.User = require('./User')(sequelize, Sequelize);
db.Community = require('./Community')(sequelize, Sequelize);
db.Comment = require('./Comment')(sequelize, Sequelize);
db.Market = require('./Market')(sequelize, Sequelize);


module.exports = db;
