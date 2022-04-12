const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'displays help menu',
	
	execute(message, args) {
		const fs = require('fs');
		const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
		let embed = new MessageEmbed().setTitle('Commands');
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			embed.addField(command.name, command.description);
		}
		message.channel.send({ embeds: [embed] });
	}
}