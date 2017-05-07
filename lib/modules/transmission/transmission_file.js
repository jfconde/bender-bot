let exec = require('child_process').exec,
    getBotCredential = function (bot) {
        let userName = bot.config['mod-transmission'].userName,
            password = bot.config['mod-transmission'].password;
        return `${userName}:${password}`;
    };

module.exports = {
    summary: 'processes uploaded torrents',
    processCmd: (msg, bot) => {
        bot.getFile(msg.document.file_id).then(file => {
            let credential = getBotCredential(bot),
                url = file.fileLink;

            exec(`transmission-remote -n ${credential} -a ${url}`, function (error, stdout, stderr) {
                if (error !== null) {
                    msg.reply.text('Error: ' + error);
                } else {
                    msg.reply.text(stdout);
                }
            });
        });
    }
};
