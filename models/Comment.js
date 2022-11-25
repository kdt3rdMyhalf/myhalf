const Comment = function (Sequelize, DataTypes) {
  const model = Sequelize.define(
    "Comment",
    {
      commId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      userName: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      commDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      commDoc: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "comment",
      freezeTableName: true,
      timestamps: false,
    }
  );
  return model;
};

module.exports = Comment;
