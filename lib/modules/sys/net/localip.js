var exec = require('child_process').exec;

module.exports = {
    summary: 'query my local IP',
    processCmd: (msg, bot) => {
        exec("ip route get 1 | awk '{print $NF;exit}'", function (error, stdout, stderr) {
            if (error !== null) {
                msg.reply.text('Error: ' + error)
            } else {
                msg.reply.text(stdout)
            }
        });
    }
};