var exec = require('child_process').exec;

module.exports = {
    summary: 'query my local IP',
    processCmd: (msg, bot) => {
        exec("ip route get 1 | awk '{print $NF;exit}'", function (error, stdout, stderr) {
            if (error !== null) {
                bot.sendMessage(msg.from.id, 'Error: ' + error)
            } else {
                bot.sendMessage(msg.from.id, stdout)
            }
        });
    }
};