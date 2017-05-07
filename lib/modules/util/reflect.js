module.exports = {
    summary: 'for debugging purposes. Log your message to the console/logfiles.',
    processCmd: (msg, bot) => {
        Log.info('[REFLECT] %s', msg.text);
        msg.reply.text('Message reflected.');
    }
};