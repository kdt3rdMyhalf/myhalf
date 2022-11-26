"use strict";

// const fs = require('fs');
// const path = require('path');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.json")["development"];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 테이블 등록
// db.뭐시기 = require('./모델파일')(sequelize, Sequelize);

db.User = require("./User")(sequelize, Sequelize);
db.Community = require("./Community")(sequelize, Sequelize);
db.Likes = require("./Likes")(sequelize, Sequelize);
db.Comment = require("./Comment")(sequelize, Sequelize);
db.Market = require("./Market")(sequelize, Sequelize);

// db 관계 정의
// user - community
db.User.hasMany(db.Community, {
  foreignKey: "userName",
  sourceKey: "userName",
});
db.Community.belongsTo(db.User, {
  foreignKey: "userName",
  targetKey: "userName",
});
// community - likes
db.Community.hasMany(db.Likes, {
  foreignKey: "postId",
  sourceKey: "postId",
});
db.Likes.belongsTo(db.Community, {
  foreignKey: "postId",
  targetKey: "postId",
});
// user - likes
db.User.hasMany(db.Likes, {
  foreignKey: "userName",
  sourceKey: "userName",
});
db.Likes.belongsTo(db.User, {
  foreignKey: "userName",
  targetKey: "userName",
});
// user - comment
db.User.hasMany(db.Comment, {
  foreignKey: "userName",
  sourceKey: "userName",
});
db.Comment.belongsTo(db.User, {
  foreignKey: "userName",
  targetKey: "userName",
});
// community - comment
db.Community.hasMany(db.Comment, {
  foreignKey: "postId",
  sourceKey: "postId",
});
db.Comment.belongsTo(db.Community, {
  foreignKey: "postId",
  targetKey: "postId",
});

module.exports = db;
