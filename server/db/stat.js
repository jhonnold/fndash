const { Op } = require('sequelize');

const IMPORTANT_NAMES = ['showdownalt', 'default', 'showdown', 'showdowntournament'];
const IMPORTANT_MODES = ['solo', 'duo', 'trios', 'squad'];

module.exports = (sequelize, DataTypes) => {
    const Stat = sequelize.define(
        'stat',
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
        },
        {
            tableName: 'stat',
            underscored: true,
            defaultScope: {
                where: {
                    name: { [Op.in]: IMPORTANT_NAMES },
                    mode: { [Op.in]: IMPORTANT_MODES },
                },
            },
        }
    );

    Stat.associate = db => {
        db.stat.belongsTo(db.input, {
            foreignKey: 'inputId',
        });

        db.stat.hasMany(db.game, {
            foreignKey: 'statId',
        });
    };

    return Stat;
};

module.exports.IMPORTANT_MODES = IMPORTANT_MODES;
module.exports.IMPORTANT_NAMES = IMPORTANT_NAMES;
