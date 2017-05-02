module.exports = function(bot){
    bot.on('/help', include('lib/modules/help')(bot));

    bot.route({ 
        event: '/ip', 
        module: 'sys/net/ip',
        permissions: 'pako'
    });
    // sys
    //   - System commands
    //bot.on('/uptime', include('lib/modules/sys/uptime')(bot));
    // sys/net
    //bot.on('/ip', include('lib/modules/sys/net/ip')(bot));
    //bot.on('/localip', include('lib/modules/sys/net/localip')(bot));
};