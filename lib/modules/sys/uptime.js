var exec = require('child_process').exec;

module.exports = {
    summary: 'how long it\'s been since the last nap?',
    processCmd: (msg, bot) => {
        exec('uptime', function (error, stdout, stderr) {
            if (error !== null) {
                bot.sendMessage(msg.from.id, 'Error: ' + error)
            } else {
                bot.sendMessage(msg.from.id, stdout)
            }
        });
    }
};