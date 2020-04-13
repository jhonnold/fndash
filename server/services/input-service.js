const { Op } = require('sequelize');
const db = require('../db');

const IMPORTANT_STAT_NAMES = ['showdownalt', 'default', 'showdown', 'showdowntournament'];
const IMPORTANT_STAT_MODES = ['solo', 'duo', 'trios', 'squad'];

const PLACEMENT_REGEX = /placetop([\d]+)/gi;

class InputService {
    getInputStats = async ({ id }) => {
        const stats = await db.Game.findOne({
            raw: true,
            attributes: [
                [db.sequelize.fn('count', db.sequelize.col('Game.id')), 'matches'],
                [db.sequelize.fn('sum', db.sequelize.col('Game.kills')), 'kills'],
                [
                    db.sequelize.fn(
                        'sum',
                        db.sequelize.literal('case when "placement" = \'Victory\' then 1 else 0 end')
                    ),
                    'wins',
                ],
            ],
            include: {
                attributes: [],
                required: true,
                model: db.Stat,
                as: 'stat',
                where: {
                    name: { [Op.in]: IMPORTANT_STAT_NAMES },
                    mode: { [Op.in]: IMPORTANT_STAT_MODES },
                },
                include: {
                    attributes: [],
                    required: true,
                    model: db.Input,
                    as: 'input',
                    where: { id },
                },
            },
        });

        return { ...stats, kd: stats.kills / Math.max(1, stats.matches - stats.wins) };
    };

    getDailyStats = async ({ id }) => {
        const dailyStats = await db.Game.findAll({
            raw: true,
            attributes: [
                [db.sequelize.fn('date_trunc', 'day', db.sequelize.col('time_played')), 'day'],
                [db.sequelize.fn('count', db.sequelize.col('Game.id')), 'matches'],
                [db.sequelize.fn('sum', db.sequelize.col('Game.kills')), 'kills'],
                [
                    db.sequelize.fn(
                        'sum',
                        db.sequelize.literal('case when "placement" = \'Victory\' then 1 else 0 end')
                    ),
                    'wins',
                ],
            ],
            group: [db.sequelize.literal(1)],
            order: [[db.sequelize.col('day'), 'ASC']],
            include: {
                attributes: [],
                required: true,
                model: db.Stat,
                as: 'stat',
                where: {
                    name: { [Op.in]: IMPORTANT_STAT_NAMES },
                    mode: { [Op.in]: IMPORTANT_STAT_MODES },
                },
                include: {
                    attributes: [],
                    required: true,
                    model: db.Input,
                    as: 'input',
                    where: { id },
                },
            },
        });

        return dailyStats.map(s => ({ ...s, kd: s.kills / Math.max(1, s.matches - s.wins) }));
    };
}

module.exports = new InputService();
