module.exports = function(bot){
    // General purpose
    bot.routeCmd({command: 'start',             module: 'util/cmdlist',                         permissions: null});
    bot.routeCmd({command: 'test',              module: 'test',                                 permissions: null});
    bot.routeCmd({command: 'cmdlist',           module: 'util/cmdlist',                         permissions: null});
    bot.routeCmd({command: 'hello',             module: 'hello',                                permissions: null});
    bot.routeCmd({command: 'help',              module: 'help',                                 permissions: null});
    bot.routeCmd({command: 'reflect',           module: 'util/reflect',                         permissions: null});
    bot.routeCmd({command: 'uptime',            module: 'sys/uptime',                           permissions: null});
    // Transmission BT client
    bot.routeCmd({command: 'transmission',      module: 'transmission/transmission',            permissions: 'transmission'});

    // User commands
    bot.routeCmd({command: 'promote',           module: 'user/promote',                         permissions: 'admin'});
    
    // Network commands
    bot.routeCmd({command: 'ip',                module: 'sys/net/ip',                           permissions: 'admin'});
    bot.routeCmd({command: 'localip',           module: 'sys/net/localip',                      permissions: 'admin'});

    bot.routeRE({regExp: /shurmano.*/,          module: 'sys/net/ip',                           permissions: 'admin'});
};