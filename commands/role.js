const roles = require('../roles.json');

module.exports = {
	name: 'role',
	description: 'adds and removes roles',

	execute(message, args) {
		const arg = args.length > 0 ? args[0].toLowerCase() : '';

		if (arg === 'list') {
			let reply = 'Roles:\n';
			for (const role in roles) {
				reply += '- ' + role[0].toUpperCase() + role.slice(1) + '\n';
			}
			message.channel.send(reply);
			return;
		}

		const roleId = roles[arg];
		if (roleId === undefined)
			message.channel.send('That role is invalid. Try using "!role list" to see a list of valid roles.');
		else if (message.member.roles.cache.has(roleId))
			message.member.roles.remove(roleId);
		else
			message.member.roles.add(roleId);
	}
}