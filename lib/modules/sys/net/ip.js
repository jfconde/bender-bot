let exec = require('child_process').exec;

module.exports = {
    summary: 'query my external IP',
    processCmd: (msg, bot) => {
        exec('dig +short myip.opendns.com @resolver1.opendns.com', function (error, stdout, stderr) {
            if (error !== null) {
                bot.sendMessage(msg.from.id, 'Error: ' + error);
            } else {
                bot.sendMessage(msg.from.id, stdout);
            }
        });
    }
};
