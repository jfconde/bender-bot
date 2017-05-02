let argv = require('yargs').alias('d', 'debug').argv,
    bot;

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

bot = include('lib/bot');
include('lib/commands')(bot);

bot.connect();