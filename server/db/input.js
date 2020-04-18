module.exports = (sequelize, DataTypes) => {
    const Input = sequelize.define(
        'input',
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
        db.input.belongsTo(db.user, {
            foreignKey: 'userId',
        });

        db.input.hasMany(db.stat, {
            foreignKey: 'inputId',
        });
    };

    return Input;
};
