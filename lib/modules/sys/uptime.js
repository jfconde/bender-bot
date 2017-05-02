var exec = require('child_process').exec;

module.exports = (msg, bot) => {
    exec('uptime', function (error, stdout, stderr) {
        if (error !== null) {
            bot.sendMessage(msg.from.id, 'Error: ' + error)
        } else {
            bot.sendMessage(msg.from.id, stdout)
        }
    });
};