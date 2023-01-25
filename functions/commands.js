// commands.js
const ping = (message, args) => {
    message.channel.send('pong');
};

const foo = (message, args) => {
    message.channel.send('bar');
};

const apagar = (message, args) => {
    message.channel.messages.fetch({ limit: 2 }).then(messages => {
        message.channel.bulkDelete(messages);
    });
};

module.exports = {
    ping,
    foo,
    apagar
};