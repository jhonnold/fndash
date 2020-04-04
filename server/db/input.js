module.exports = (sequelize, DataTypes) => {
    const Input = sequelize.define(
        'Input',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            inputType: {
                type: DataTypes.STRING,
                field: 'input_type',
            },
        },
        {
            tableName: 'input',
            underscored: true,
            timestamps: false,
        }
    );

    Input.associate = db => {
        db.Input.belongsTo(db.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        db.Input.hasMany(db.Stat, {
            foreignKey: 'inputId',
            as: 'stats',
        });
    };

    return Input;
};
