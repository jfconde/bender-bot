module.exports = {
    summary: 'greetings',
    processCmd: (msg, bot) => {
        return msg.reply.text(`Hola, ${msg.from.first_name}! ¿Cómo estás?`, { reply: true });
    }
};