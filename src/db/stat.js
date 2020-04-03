module.exports = (sequelize, DataTypes) => {
    const Stat = sequelize.define(
        'Stat',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            name: DataTypes.STRING,
            mode: DataTypes.STRING,
            isLimitedTimeMode: {
                type: DataTypes.BOOLEAN,
                field: 'is_ltm',
            },
            kills: DataTypes.INTEGER,
            matchesPlayed: {
                type: DataTypes.INTEGER,
                field: 'matchesplayed',
            },
            playersOutLived: {
                type: DataTypes.INTEGER,
                field: 'playersoutlived',
            },
            minutesPlayed: {
                type: DataTypes.INTEGER,
                field: 'minutesplayed',
            },
            placements: {
                type: DataTypes.JSONB,
                field: 'placements',
            },
        },
        {
            tableName: 'stat',
            underscored: true,
        }
    );

    Stat.associate = db => {
        db.Stat.belongsTo(db.Input, {
            foreignKey: 'inputId',
            as: 'input',
        });

        db.Stat.hasMany(db.Game, {
            foreignKey: 'statId',
            as: 'games',
        });
    };

    return Stat;
};
