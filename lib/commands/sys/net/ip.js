let exec = require('child_process').exec,
    User = include('lib/model/user/user');

module.exports = function (bot) {
    return (msg) => {
        var userId = msg.from.id;

        User.find({
            where: {
                userId: userId
            }
        }).then(function processRequest(currentUser) {
            exec('dig +short myip.opendns.com @resolver1.opendns.com', function (error, stdout, stderr) {
                if (error !== null) {
                    bot.sendMessage(msg.from.id, 'Error: ' + error);
                } else {
                    bot.sendMessage(msg.from.id, stdout);
                }
            });
        });

    };
};