var exec = require('child_process').exec;

module.exports = {
    summary: 'how long it\'s been since the last nap?',
    processCmd: (msg, bot) => {
        exec('uptime', function (error, stdout, stderr) {
            if (error !== null) {
                msg.reply.text('Error: ' + error)
            } else {
                msg.reply.text(stdout)
            }
        });
    }
};