const roles = require('../config/roles.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'role',
	description: 'adds and removes roles',

	execute(message, args) {
		const arg = args.length > 0 ? args[0].toLowerCase() : '';

		if (arg === 'list') {
			let list = '';
			for (const role in roles)
				list += role[0].toUpperCase() + role.slice(1) + '\n';
			let embed = new MessageEmbed()
				.setTitle('Roles')
				.setDescription(list);
			message.channel.send({ embeds: [embed] });
			return;
		}

		const role = roles[arg];
		if (role === undefined)
			message.channel.send('That role is invalid. Try using "!role list" to see a list of valid roles.');
		else if (message.member.roles.cache.has(role.id))
			message.member.roles.remove(role.id);
		else
			message.member.roles.add(role.id);
	}
}