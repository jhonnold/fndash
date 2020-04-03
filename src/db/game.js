module.exports = (sequelize, DataTypes) => {
    const Game = sequelize.define(
        'Game',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            kills: DataTypes.INTEGER,
            placement: DataTypes.STRING,
            timePlayed: {
                type: DataTypes.DATE,
                field: 'time_played',
            },
        },
        {
            tableName: 'game',
            underscored: true,
            timestamps: false,
        }
    );

    Game.associate = db => {
        db.Game.belongsTo(db.Stat, {
            foreignKey: 'statId',
            as: 'stat',
        });
    };

    return Game;
};
