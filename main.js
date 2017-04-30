let argv = require('yargs').alias('d', 'debug').argv;
global.base_dir = __dirname;
global.abs_path = function (path) {
    return global.base_dir + path;
};

global.debugMode = !!argv.debug;
// Support global requires via include
global.include = function (file) {
    return require(global.abs_path('/' + file));
};

// Prepare the logging
global.Log = include('lib/logger');
// Setup and connect to the backend
global.DB = include('lib/database');
// Load the security model in order to allow and deny user actions based on his/her role.
global.security = include('lib/security');

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