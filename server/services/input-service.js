const db = require('../db');

class InputService {
    getInputStats = async ({ id }) => {
        const stats = await db.game.findOne({
            raw: true,
            attributes: [
                [db.sequelize.fn('count', db.sequelize.col('game.id')), 'matches'],
                [db.sequelize.fn('sum', db.sequelize.col('game.kills')), 'kills'],
                [
                    db.sequelize.fn(
                        'count',
                        db.sequelize.literal('case when "placement" = \'Victory\' then 1 else null end')
                    ),
                    'wins',
                ],
            ],
            include: {
                attributes: [],
                required: true,
                model: db.stat,
                include: {
                    attributes: [],
                    required: true,
                    model: db.input,
                    where: { id },
                },
            },
        });

        return { ...stats, kills: stats.kills || 0, kd: stats.kills / Math.max(1, stats.matches - stats.wins) };
    };

    getDailyStats = async ({ id }) => {
        const dailyStats = await db.game.findAll({
            raw: true,
            attributes: [
                [db.sequelize.fn('date_trunc', 'day', db.sequelize.col('time_played')), 'day'],
                [db.sequelize.fn('count', db.sequelize.col('game.id')), 'matches'],
                [db.sequelize.fn('sum', db.sequelize.col('game.kills')), 'kills'],
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
                model: db.stat,
                include: {
                    attributes: [],
                    required: true,
                    model: db.input,
                    where: { id },
                },
            },
        });

        return dailyStats.map(s => ({ ...s, kd: s.kills / Math.max(1, s.matches - s.wins) }));
    };

    getInputPlacements = async ({ id }) => {
        const placements = await db.game.findAll({
            raw: true,
            attributes: [
                [db.sequelize.col('stat.mode'), 'mode'],
                'placement',
                [db.sequelize.fn('count', db.sequelize.col('game.placement')), 'count'],
            ],
            group: [db.sequelize.col('stat.mode'), 'placement'],
            include: {
                attributes: [],
                required: true,
                model: db.stat,
                include: {
                    attributes: [],
                    required: true,
                    model: db.input,
                    where: { id },
                },
            },
        });

        return placements;
    };
}

module.exports = new InputService();
