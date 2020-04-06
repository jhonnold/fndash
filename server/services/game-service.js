const { Op } = require('sequelize');
const db = require('../db');

module.exports = {
    getAllFor: ({ inputId }) =>
        db.Game.findAll({
            order: [['timePlayed', 'DESC']],
            include: {
                required: true,
                model: db.Stat,
                as: 'stat',
                include: {
                    required: true,
                    model: db.Input,
                    as: 'input',
                    where: {
                        id: inputId,
                    },
                    include: 'user',
                },
            },
        }),

    getLastGamePerUser: async () => {
        const maxGameIdForUsers = await db.Game.findAll({
            attributes: [[db.sequelize.fn('max', db.sequelize.col('Game.id')), 'id']],
            group: [db.sequelize.col('stat.input.user_id')],
            include: {
                required: true,
                model: db.Stat,
                attributes: [],
                as: 'stat',
                include: {
                    required: true,
                    model: db.Input,
                    attributes: [],
                    as: 'input',
                },
            },
        });

        const ids = maxGameIdForUsers.map(g => g.id);

        return db.Game.findAll({
            where: { id: { [Op.in]: ids } },
            order: [['timePlayed', 'DESC']],
            include: {
                required: true,
                model: db.Stat,
                as: 'stat',
                include: {
                    required: true,
                    model: db.Input,
                    as: 'input',
                    include: {
                        required: true,
                        model: db.User,
                        as: 'user',
                    },
                },
            },
        });
    },
};
