const fs = require('fs'),
    telebot = require('telebot'),
    botConfigPath = 'config/bot.json';

module.exports = (function () {
    var bot, botConfig,
        cmdList = {},
        processRouteFn, getRequestUserFn, mimeHandlers = {};

    processRouteFn = function (bot, cmdModule, opts) {
        return function (msg) {
            getRequestUserFn(msg.from.id).then(function (user) {
                let nextPromise,
                    argsStr = msg.text.replace(/^\/[^\s]*\s*/g, '');

                msg.argsStr = argsStr;

                if (user) {
                    user.set({
                        firstName: msg.from.first_name,
                        lastName: msg.from.last_name,
                        userName: msg.from.username
                    });
                    nextPromise = user.save();
                } else {
                    // Register current user
                    nextPromise = new Promise((resolve, reject) => {
                        DB.user.create({
                            userId: msg.from.id,
                            firstName: msg.from.first_name,
                            lastName: msg.from.last_name,
                            userName: msg.from.username
                        }).then(user => {
                            // TODO: just for testing, hehehe
                            if (user.get('userId') === bot.config.masterUserId) {
                                DB.role.find({
                                    where: {
                                        name: '*'
                                    }
                                }).then(function (masterRole) {
                                    user.addRole(masterRole.get('id'));
                                    resolve();
                                });
                            } else {
                                resolve();
                            }
                        }).catch(() => reject());
                    });
                }

                nextPromise.then(function (user) {
                    msg.currentUser = user;
                    if (opts.permissions) {
                        if (msg.currentUser) {
                            msg.currentUser.hasPermission(opts.permissions).then(function (result) {
                                if (result) {
                                    cmdModule.processCmd.call(this, msg, bot);
                                } else {
                                    Log.error('user (%s) tried to acess protected resource (%s) but lacked permission (%s).', msg.from.id, opts.command, opts.permissions);
                                    msg.reply.text('No tienes los permisos adecuados.')
                                }
                            });
                        } else {
                            Log.error('user (%s) tried to acess protected resource (%s) but has not subscribed.', msg.from.id, opts.command);
                            msg.reply.text('¿Y tú quién eres?');
                        }
                    } else {
                        cmdModule.processCmd.call(this, msg, bot);
                    }
                });
            });
        };
    };

    getRequestUserFn = function (fromId) {
        return DB.user.find({
            where: {
                userId: fromId
            }
        });
    };

    try {
        botConfig = JSON.parse(fs.readFileSync(botConfigPath, 'utf8'));
    }
    catch (err) {
        Log.error('could not open database configuration file (%s).', botConfigPath);
        throw new Error('Bot configuration could not be opened.');
    }

    bot = new telebot({
        token: botConfig.telegramToken, // Required. Telegram Bot API token.
        config: botConfig,

        polling: { // Optional. Use polling.
            interval: 500, // Optional. How often check updates (in ms).
            timeout: 0, // Optional. Update polling timeout (0 - short polling).
            limit: 50, // Optional. Limits the number of updates to be retrieved.
            retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
            allowedUpdates: [] // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates regardless of type.
        },
        usePlugins: ['shortReply', 'floodProtection', 'regExpMessage', 'commandButton'],
        pluginConfig: {
            floodProtection: {
                interval: 0.5
            }
        }
    });

    bot.config = botConfig;

    bot.catalog = (opts, module) => {
        if (opts.command) {
            cmdList[opts.command] = {
                permissions: [opts.permissions],
                summary: module.summary,
                doc: module.doc
            };
        }
    };

    bot.getCatalog = () => {
        return cmdList;
    };

    bot.routeCmd = (opts) => {
        let cmdModule;

        if (!opts || !opts.command || !opts.module) {
            Log.warn('route was called without valid arguments (service: %s) ', (opts ? opts.command : 'unknown'));
            return;
        }

        cmdModule = include('lib/modules/' + opts.module)
        bot.catalog(opts, cmdModule);
        bot.on('/' + opts.command, processRouteFn(bot, cmdModule, opts));
    };

    bot.routeRE = (opts) => {
        let cmdModule;

        if (!opts || !opts.regExp || !opts.module) {
            Log.warn('route was called without valid arguments (service: %s) ', (opts ? opts.command : 'unknown'));
            return;
        }

        cmdModule = include('lib/modules/' + opts.module)
        bot.catalog(opts, cmdModule);
        bot.on(opts.regExp, processRouteFn(bot, cmdModule, opts));
    };
    
    bot.routeMime = (opts) => {
        let cmdModule;
        
        if (!opts || !opts.mimeType || !opts.module) {
            Log.warn('route was called without valid arguments (service: %s) ', (opts ? opts.command : 'unknown'));
            return;
        }

        cmdModule = include('lib/modules/' + opts.module);

        mimeHandlers[opts.mimeType] = cmdModule;
    };

    bot.on('document', function processDocumentByMime(msg) {
        var mimeType = msg.document.mime_type,
            handler = mimeHandlers[mimeType];

        if(handler) {
            handler.processCmd.call(this, msg, bot);
        }else{
            Log.info(`Document request >> No handler associated with MIME type ${mimeType}`);
        }
    });

    return bot;
})();