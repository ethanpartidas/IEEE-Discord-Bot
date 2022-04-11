module.exports = {
	name: 'help',
	description: 'displays help menu',
	
	execute(message, args) {
		const fs = require('fs');
		const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
		let reply = 'Commands:\n';
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			reply += '- ' + command.name + ': ' + command.description + '\n';
		}
		message.channel.send(reply);
		return;
	}
}