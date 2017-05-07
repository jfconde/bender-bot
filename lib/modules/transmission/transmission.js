module.exports = (function () {
    var instructionDefs = {
        LIST: 'list',
        ADD: 'add',
        REMOVE: 'remove',
        START: 'start',
        STOP: 'stop'
    },
        instructionMapping = {},
        getBotCredential = function (bot) {
            let userName = bot.config['mod-transmission'].userName,
                password = bot.config['mod-transmission'].password;
            return `${userName}:${password}`;
        };

    instructionMapping[instructionDefs.LIST] = (msg, bot) => {
        let credential = getBotCredential(bot);

        exec(`transmission-remote -n ${credential} -l`, function (error, stdout, stderr) {
            if (error !== null) {
                msg.reply.text('Error: ' + error);
            } else {
                msg.reply.text(stdout);
            }
        });
    };

    return {
        summary: 'controls Transmission BitTorrent client',
        processCmd: (msg, bot) => {
            let instruction = msg.argsStr.split(' ').length ? msg.argsStr.split(' ')[0] : null;

            if (instructionMapping[instruction]) {
                return instructionMapping[instruction].call(this, msg, bot);
            } else {
                msg.reply.text('You must supply the appropiate instruction (list/add/remove/start/stop)');
            }
        }
    };
})();