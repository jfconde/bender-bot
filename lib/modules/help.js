module.exports = (msg, bot) => {
    let fromId = msg.from.id;
    let firstName = msg.from.first_name;
    let reply = msg.message_id;
    return bot.sendMessage(fromId, `This is Help. Welcome, ${firstName} ${fromId}!`, { reply });
};