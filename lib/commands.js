module.exports = function(bot){
    bot.on('text', include('lib/commands/hello')(bot));
};