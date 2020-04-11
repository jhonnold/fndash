const { Op } = require('sequelize');
const db = require('../db');

class GameService {
    getAllFor = ({ inputId }) =>
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
        });

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
