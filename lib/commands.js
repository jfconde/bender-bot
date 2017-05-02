module.exports = function(bot){
    // General purpose
    bot.routeCmd({event: 'test',              module: 'test',                                 permissions: null});

    bot.routeCmd({event: 'cmdlist',           module: 'util/cmdlist',                         permissions: null});
    bot.routeCmd({event: 'hello',             module: 'hello',                                permissions: null});
    bot.routeCmd({event: 'help',              module: 'help',                                 permissions: null});
    bot.routeCmd({event: 'reflect',           module: 'util/reflect',                         permissions: null});
    bot.routeCmd({event: 'uptime',            module: 'sys/uptime',                           permissions: null});
    
    // User commands
    bot.routeCmd({event: 'promote',           module: 'user/promote',                         permissions: 'admin'});
    
    // Network commands
    bot.routeCmd({event: 'ip',                module: 'sys/net/ip',                           permissions:  'admin'});
    bot.routeCmd({event: 'localip',           module: 'sys/net/localip',                      permissions:  'admin'});
};