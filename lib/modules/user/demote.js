let deasync = require('deasync');

module.exports = {
    summary: 'lets you promote a user to superadmin.',
    processCmd: (msg, bot) => {
        var targetUserName = msg.argsStr.replace(/@/g, '');

        if (targetUserName) {
            msg.reply.text(`Let's demote @${targetUserName}.`);
        } else {
            msg.reply.text(`I need a valid userName to demote it.`);
            return;
        }

        deasync.sleep(25);

        DB.user.find({
            where: {
                userName: targetUserName
            }
        }).then(function (user) {
            if (user) {
                user.hasPermission('*').then(userIsMasterAdmin => {
                    if (!userIsMasterAdmin) {
                        msg.reply.text(`Error: @${targetUserName} is not super-admin.`);
                    } else {
                        user.addRoleByName('*').then((result, role) => {
                            if (result) {
                                if (role || true) {
                                    msg.reply.text(`@${targetUserName} promoted to superAdmin!.`);
                                    bot.sendMessage(user.get('userId'), `Hi! @${user.userName} promoted you (@${targetUserName}).`);
                                } else {
                                    msg.reply.text(`@${targetUserName} was already a superAdmin, jackass.`);
                                }
                            } else {
                                msg.reply.text('Some shit happened!.');
                            }
                        });
                    }
                });
            } else {
                msg.reply.text(`Tell @${targetUserName} to say hi to the bot with "hello", please..`, targetUserName);
            }
        });
    }
};