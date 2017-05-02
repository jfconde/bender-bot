module.exports = (msg, bot) => {
    Log.info('[REFLECT] %s', msg.text);
    bot.sendMessage(msg.from.id, 'Message reflected.');
};