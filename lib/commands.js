module.exports = function(bot){
    bot.on('text', include('lib/commands/hello')(bot));

    // sys
    //   - System commands
    bot.on('/uptime', include('lib/commands/sys/uptime')(bot));
    // sys/net
    bot.on('/ip', include('lib/commands/sys/net/ip')(bot));
    bot.on('/localip', include('lib/commands/sys/net/localip')(bot));
};