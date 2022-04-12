const channels = require('../config/channels.json');
const roles = require('../config/roles.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'reactionrole',
	description: 'adds roles with reactions',
	
	async execute(message, args, client) {
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

		if (message.channel.id !== channels.roles) {
			message.channel.send('Please use the roles channel.');
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