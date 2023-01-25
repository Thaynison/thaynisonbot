
const { token, prefix } = require('./config');
const { Client, GatewayIntentBits } = require('discord.js');
const express = require('express');
const ejs = require('ejs');
const app = express();
const { getDataFromDb } = require('./database');
const mysql = require('mysql2');
const commands = require('./commands');

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on("ready", async() => {
    console.log(`😍: Bot online com sucesso "${client.user.tag}".`);

    let activities =  [
        `Visual Studio Code 📄`
    ]
    i = 0;
    setInterval( () =>
    client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "PLAYING"
    }), 1000 * 60 * 15);
    client.user
        .setStatus("dnd");
})

app.get('/', (req, res) => {
    getDataFromDb()
        .then(data => {
            res.render('index', { client, data });
        })
        .catch(err => {
            console.log(err);
        });
});

// Configurar o EJS como engine de template
app.set('view engine', 'ejs');

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

client.on('message', message => {
    if (!message.content.startsWith('/')) return;
    const args = message.content.slice(1).split(/ +/);
    const command = args.shift().toLowerCase();

    // verifica se o comando existe
    if (!commands[command]) {
        return message.channel.send(`Comando inválido. Use /help para ver a lista de comandos.`);
    }

    // verifica se o usuário tem permissão para usar o comando
    if (command.guild && !message.member.hasPermission("ADMINISTRATOR")) {
        return message.channel.send(`Você não tem permissão para usar este comando.`);
    }

    // executa o comando
    try {
        commands[command](message, args);
    } catch (error) {
        console.error(error);
        message.channel.send(`Ocorreu um erro ao executar este comando.`);
    }
});

client.login(token);