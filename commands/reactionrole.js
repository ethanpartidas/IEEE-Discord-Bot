const channels = require('../config/channels.json');
const roles = require('../config/roles.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'reactionrole',
	description: 'adds roles with reactions',
	
	async execute(message, args) {

		if (message.channel.id !== channels.roles) {
			message.channel.send('Go to the roles channel to get your role!');
			return;
		}

		const embed = new MessageEmbed()
			.setTitle('Reaction Roles')
			.setDescription('React to your emoji to get your role!')
		let botMessage = await message.channel.send({ embeds: [embed] });

		for (const role in roles)
			botMessage.react(roles[role].emoji);
	}
}