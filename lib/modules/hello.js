module.exports = (msg, bot) => {
    return bot.sendMessage(msg.from.id, `Hola, ${msg.from.first_name}! ¿Cómo estás?`, { reply: true });
};