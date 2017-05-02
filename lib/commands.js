module.exports = function(bot){
    bot.route({event: '/hello',             module: 'hello',                                permissions: null});
    bot.route({event: '/help',              module: 'help',                                 permissions: null});
    bot.route({event: '/reflect',           module: 'util/reflect',                         permissions: null});
    bot.route({event: '/uptime',            module: 'sys/uptime',                           permissions: null});
    
    // User commands
    bot.route({event: '/promote',           module: 'user/promote',                         permissions: 'admin'});
    
    // Network commands
    bot.route({event: '/ip',                module: 'sys/net/ip',                           permissions:  'admin'});
    bot.route({event: '/localip',           module: 'sys/net/localip',                      permissions:  'admin'});
};