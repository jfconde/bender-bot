// Support global requires via include
global.base_dir = __dirname;
global.abs_path = function (path) {
    return base_dir + path;
};

global.include = function (file) {
    return require(abs_path('/' + file));
};

const TeleBot = require('telebot');

const bot = new TeleBot({
    token: '270092014:AAGj1oqCrqQKGTobK3MnGmTdW_3p_RU-Vcs', // Required. Telegram Bot API token.
    polling: { // Optional. Use polling.
        interval: 500, // Optional. How often check updates (in ms).
        timeout: 0, // Optional. Update polling timeout (0 - short polling).
        limit: 50, // Optional. Limits the number of updates to be retrieved.
        retryTimeout: 5000, // Optional. Reconnecting timeout (in ms).
        allowedUpdates: [] // Optional. List the types of updates you want your bot to receive. Specify an empty list to receive all updates regardless of type.
    },

    modules: {}
});

include('lib/commands')(bot);

bot.connect();