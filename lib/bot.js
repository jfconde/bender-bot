const fs = require('fs'),
    telebot = require('telebot'),
    deasync = require('deasync'),
    botConfigPath = 'config/bot.json';

module.exports = (function () {
    let bot, botConfig;

    try {
        botConfig = JSON.parse(fs.readFileSync(botConfigPath, 'utf8'));
    }
    catch (err) {
        Log.error('could not open database configuration file (%s).', botConfigPath);
        throw new Error('Bot configuration could not be opened.');
    }

    bot = new telebot({
        token: botConfig.telegramToken, // Required. Telegram Bot API token.

        polling: { // Optional. Use polling.
            interval: 500, // Optional. How often check updates (in ms).
            timeout: 0, // Optional. Update polling timeout (0 - short polling).
            limit: 50, // Optional. Limits the number of updates to be retrieved.
            retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            allowedUpdates: [] // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates regardless of type.
        },
        modules: {}
    });

    // Check the current user on requests.
    bot.mod('message', data => {
        var transactionDone,
            transactionTime = new Date(),
            userId = data && data.msg && data.msg.from ? data.msg.from.id : null;

        if (!userId) {
            return;
        }

        DB.user.find({
            where: {
                userId: userId
            }
        }).then(currentUser => {
            data.msg.currentUser = currentUser;
            transactionDone = true;
        });

        while (!transactionDone) {
            deasync.sleep(15);
        }

        return data;
    });

    bot.route = (opts) => {
        let processRouteFn;

        if (!opts || !opts.event || !opts.module) {
            Log.warn('route was called without valid arguments (service: %s) ', (opts ? opts.event : 'unknown'));
            return;
        }

        processRouteFn = function (bot) {
            var module = include('lib/modules/' + opts.module);
            return function (msg) {
                var currentUser = msg.currentUser;

                if (opts.permissions) {
                    if (currentUser) {
                        currentUser.hasPermission(opts.permissions).then(function (result) {
                            if (result) {
                                module.call(this, msg, bot);
                            } else {
                                Log.error('user (%s) tried to acess protected resource (%s) but lacked permission (%s).', msg.from.id, opts.event, opts.permissions);
                                bot.sendMessage(msg.from.id, 'No tienes los permisos adecuados.')
                            }
                        });
                    } else {
                        Log.error('user (%s) tried to acess protected resource (%s) but has not subscribed.', msg.from.id, opts.event, opts.permissions);
                        bot.sendMessage(msg.from.id, '¿Y tú quién eres?');
                    }
                } else {
                    module.call(this, msg, bot);
                }
            };
        };

        bot.on(opts.event, processRouteFn(bot));
    };

    return bot;
})();