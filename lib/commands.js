module.exports = function(bot){
    bot.on('/help', include('lib/commands/help')(bot));
    // sys
    //   - System commands
    bot.on('/uptime', include('lib/commands/sys/uptime')(bot));
    // sys/net
    bot.on('/ip', include('lib/commands/sys/net/ip')(bot));
    bot.on('/localip', include('lib/commands/sys/net/localip')(bot));
};