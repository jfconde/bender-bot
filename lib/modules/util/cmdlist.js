module.exports = {
    summary: 'what can I do for you? Or, better put, what can you do for me, Bender?',
    doc: 'extended Doc',

    processCmd: (msg, bot) => {
        var roles = [],
            res = '*List of available commands*: ',
            availableCount = 0, totalCount = 0,
            catalog = bot.getCatalog(),
            checkCmdPermissions = (permissions) => {
                if(!permissions || !permissions.length) {
                    return true;
                }

                return permissions.every(function (permissionName) {
                    return !permissionName || roles.indexOf(permissionName) >= 0 || roles.indexOf('*') >= 0;
                });
            };

        new Promise((resolve, reject) => {
            if (msg.currentUser) {
                msg.currentUser.getRoles().then(dbRoles => {
                    roles = dbRoles.map(role => { return role.get('name'); });
                    resolve();
                });
            } else {
                resolve();
            }
        }).then(() => {
            res += `\n(Your user roles are: *[${roles.indexOf('*') < 0 ? roles.join(', ') : '<ALL ROLES>'}]*)\n`;

            for (var property in catalog) {
                totalCount++;
                if (checkCmdPermissions(catalog[property].permissions)) {
                    availableCount++;
                    res += `\n/${property} - ${catalog[property].summary ? catalog[property].summary : 'No summary'}`
                }
            }

            res += `\n\n⏰Total: *${totalCount}* commands, of which *${availableCount}* are accessible.`;
            bot.sendMessage(msg.from.id, res, {parse: 'Markdown'});
        });
    }
};