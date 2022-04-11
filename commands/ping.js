module.exports = {
	name: 'ping',
	description: 'pongs your ping',
	
	execute(message, args) {
		message.channel.send('pong');
	}
}