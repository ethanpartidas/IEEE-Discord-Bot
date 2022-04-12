const { Client, Intents } = require('discord.js');
const client = new Client({
	intents: [
		Intents.FLAGS.GUILDS,
		Intents.FLAGS.GUILD_MESSAGES,
		Intents.FLAGS.GUILD_MESSAGE_REACTIONS
	],
	partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

// load command code
const fs = require('fs');
let commands = {};
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands[command.name] = command;
}

client.once('ready', () => {
	console.log('Chanos is online.');
});

client.on('messageCreate', message => {
	const prefix = '!';

	if (!message.content.startsWith(prefix) || message.author.bot)
		return;

	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	const script = commands[command];
	if (script !== undefined)
		script.execute(message, args, client);
});

const { token } = require('./config/token.json');
client.login(token);