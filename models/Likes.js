const Likes = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
    "likes",
    {
        id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        userName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        unique: true,
        },
        postId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        tableName: "likes",
        freezeTableName: true,
        timestamps: false,
    }
    );
    return model;
};

module.exports = Likes;
