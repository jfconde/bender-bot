var exec = require('child_process').exec;

module.exports = function (bot) {
    return (msg) => {
        exec("ip route get 1 | awk '{print $NF;exit}'", function (error, stdout, stderr) {
            if (error !== null) {
                bot.sendMessage(msg.from.id, 'Error: ' + error)
            }else {
                bot.sendMessage(msg.from.id, stdout)
            }
        });
    };
};