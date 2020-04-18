module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'user',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            uid: DataTypes.STRING,
            username: DataTypes.STRING,
            lastKnownDataHash: {
                type: DataTypes.STRING,
                field: 'last_known_data_hash',
            },
        },
        {
            tableName: 'user',
            underscored: true,
        }
    );

    User.associate = db => {
        db.user.hasMany(db.input, {
            foreignKey: 'userId',
        });
    };

    return User;
};
