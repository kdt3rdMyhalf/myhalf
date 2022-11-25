const Market  = function (Sequelize, DataTypes) {
    const model = Sequelize.define(
        'Market',
        {
            marketId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            userName: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            marketDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            marketTitle: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            marketDoc: {
                type: DataTypes.TEXT('long'),
                allowNull: false,
            },
            marketImg: {
                type: DataTypes.TEXT('long'),
                allowNull: true,
            },
            marketViews: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            marketCategory: {
                type: DataTypes.STRING(30),
                allowNull: false,
            },
            marketTag: {
                type: DataTypes.STRING(30),
                allowNull: true,
            },
        },
        {
            tableName: 'market',
            freezeTableName: true,
            timestamps: false,
        }
    );
    return model;
};

module.exports = Market;
