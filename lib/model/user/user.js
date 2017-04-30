let Sequelize = require('sequelize');
module.exports = (function () {
    var userModel = DB.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },

        userId: {
            type: Sequelize.INTEGER,
            comment: 'This field holds the internal userId used in Telegram to uniquely specify a user.',
            unique: true
        }
    });

    userModel.sync();
    return userModel;
})();