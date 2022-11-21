const Community = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        'Community',
        {
            postId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            postDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            postTitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            postDoc: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            postImg: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            postViews: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postLikes: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            postCategory: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            postTag: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            tableName: 'community',
            freezeTableName: true,
            timestamps: false,
        }
    );
    return model;
};

module.exports = Community;
