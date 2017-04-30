const winston = require('winston');
require('winston-daily-rotate-file');

module.exports = (function createLogger() {
    var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                level: 'silly',
                colorize: true
            }),
            new (winston.transports.DailyRotateFile)({ 
                filename: './log/bot.log',
                datePattern: '.dd-MM-YYYY',
                level: 'info'
            })
        ]
    });

    return logger;
})();