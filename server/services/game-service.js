const { Op } = require('sequelize');
const db = require('../db');
const { IMPORTANT_MODES } = require('../db/stat');

const PAGE_SIZE = 20;

class GameService {
    getAllFor = ({ inputId, page = 1 }) =>
        db.game.findAndCountAll({
            limit: PAGE_SIZE,
            offset: (page - 1) * PAGE_SIZE,
            order: [['timePlayed', 'DESC']],
            include: {
                required: true,
                model: db.stat,
                include: {
                    required: true,
                    model: db.input,
                    where: {
                        id: inputId,
                    },
                    include: 'user',
                },
            },
        });

    getRecordsFor = async ({ inputId }) => {
        const results = await Promise.all(
            IMPORTANT_MODES.map(mode =>
                db.game.findOne({
                    order: [['kills', 'DESC']],
                    include: {
                        required: true,
                        model: db.stat,
                        where: { mode },
                        include: {
                            required: true,
                            model: db.input,
                            where: { id: inputId },
                            include: {
                                required: true,
                                model: db.user,
                            },
                        },
                    },
                })
            )
        );

        return results.filter(Boolean);
    };

    getRecent = () =>
        db.game.findAll({
            /* Normally this would be set to ~20 minutes in the past, but  
               without additional games being collected anymore, this is done
               for visuals only */
            where: { timePlayed: { [Op.gt]: new Date('2019-08-24 21:45:00.000') } },
            order: [['timePlayed', 'DESC']],
            include: {
                required: true,
                model: db.stat,
                include: {
                    required: true,
                    model: db.input,
                    include: {
                        required: true,
                        model: db.user,
                    },
                },
            },
        });
}

module.exports = new GameService();
