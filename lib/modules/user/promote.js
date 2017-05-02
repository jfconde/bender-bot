let deasync = require('deasync');

module.exports = {
    summary: 'lets you promote a user to superadmin.',
    processCmd: (msg, bot) => {
        var targetUserName = msg.argsStr.replace(/@/g, '');;
        bot.sendMessage(msg.from.id, `Let's promote @${targetUserName}.`);
        deasync.sleep(25)

        DB.user.find({
            where: {
                userName: targetUserName
            }
        }).then(function (user) {
            if (user) {
                user.hasPermission('*').then(userIsMasterAdmin => {
                    if (userIsMasterAdmin) {
                        bot.sendMessage(msg.from.id, `Error: @${targetUserName} is already super-admin.`);
                    } else {
                        user.addRoleByName('*').then((result, role) => {
                            if (result) {
                                if (role || true) {
                                    bot.sendMessage(msg.from.id, `@${targetUserName} promoted to superAdmin!.`);
                                    bot.sendMessage(user.get('userId'), `Hi! @${user.userName} promoted you (@${targetUserName}).`);
                                } else {
                                    bot.sendMessage(msg.from.id, `@${targetUserName} was already a superAdmin, jackass.`);
                                }
                            } else {
                                bot.sendMessage(msg.from.id, 'Some shit happened!.');
                            }
                        });
                    }
                });
            } else {
                bot.sendMessage(msg.from.id, `Tell @${targetUserName} to say hi to the bot with "hello", please..`, targetUserName);
            }
        });
    }
};