const User = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            
            userId: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            userPw: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            userImg: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            userBirth: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            userName: {
                type: DataTypes.STRING(30),
                allowNull: false,
            }
        },
        {
            tableName: 'user',
            freezeTableName: true,
            timestamps: false,
        }
    );
    return model;
};

module.exports = User;
