module.exports = function (bot) {
    return (msg) => {
        let fromId = msg.from.id;
        let firstName = msg.from.first_name;
        let reply = msg.message_id;
        return bot.sendMessage(fromId, `Welcome, ${firstName} ${fromId}!`, { reply });
    };
};