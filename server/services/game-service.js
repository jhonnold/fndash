const { Op } = require('sequelize');
const db = require('../db');

const PAGE_SIZE = 20;
const IMPORTANT_STAT_NAMES = ['showdownalt', 'default', 'showdown', 'showdowntournament'];
const IMPORTANT_STAT_MODES = ['solo', 'duo', 'trios', 'squad'];

class GameService {
    getAllFor = ({ inputId, page = 1 }) =>
        db.Game.findAndCountAll({
            limit: PAGE_SIZE,
            offset: (page - 1) * PAGE_SIZE,
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
        });

    getRecordsFor = async ({ inputId }) => {
        const results = await Promise.all(
            IMPORTANT_STAT_MODES.map(mode =>
                db.Game.findOne({
                    order: [['kills', 'DESC']],
                    include: {
                        required: true,
                        model: db.Stat,
                        as: 'stat',
                        where: { name: { [Op.in]: IMPORTANT_STAT_NAMES }, mode },
                        include: {
                            required: true,
                            model: db.Input,
                            as: 'input',
                            where: { id: inputId },
                            include: {
                                required: true,
                                model: db.User,
                                as: 'user',
                            },
                        },
                    },
                })
            )
        );

        return results.filter(Boolean);
    };

    getRecent = () =>
        db.Game.findAll({
            /* Normally this would be set to ~20 minutes in the past, but  
               without additional games being collected anymore, this is done
               for visuals only */
            where: { timePlayed: { [Op.gt]: new Date('2019-08-24 21:45:00.000') } },
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
}

module.exports = new GameService();
