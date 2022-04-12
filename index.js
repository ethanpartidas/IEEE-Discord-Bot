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

// process command
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

// boot reactionrole on startup
const channels = require('./config/channels.json');
const roles = require('./config/roles.json');
client.on('messageReactionAdd', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	if (user.bot) return;
	if (!reaction.message.guild) return;
	if (reaction.message.channel.id !== channels.roles) return;
	for (const role in roles)
		if (reaction.emoji.name === roles[role].emoji)
			await reaction.message.guild.members.cache.get(user.id).roles.add(roles[role].id);
});
client.on('messageReactionRemove', async (reaction, user) => {
	if (reaction.message.partial) await reaction.message.fetch();
	if (reaction.partial) await reaction.fetch();
	if (user.bot) return;
	if (!reaction.message.guild) return;
	if (reaction.message.channel.id !== channels.roles) return;
	for (const role in roles)
		if (reaction.emoji.name === roles[role].emoji)
			await reaction.message.guild.members.cache.get(user.id).roles.remove(roles[role].id);
});

const { token } = require('./config/token.json');
client.login(token);