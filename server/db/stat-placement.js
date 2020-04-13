module.exports = (sequelize, DataTypes) => {
    const StatPlacement = sequelize.define(
        'StatPlacement',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            placement: DataTypes.STRING,
            count: DataTypes.INTEGER,
        },
        {
            tableName: 'stat_placement',
            underscored: true,
            timestamps: false,
        }
    );

    StatPlacement.associate = db => {
        db.StatPlacement.belongsTo(db.Stat, {
            foreignKey: 'statId',
            as: 'stat',
        });
    };

    return StatPlacement;
};
