const { Events, EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: Events.MessageCreate,
    async execute(message, client) {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.config.prefix)) return;

        const args = message.content.slice(client.config.prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = client.commands.get(commandName);
        if (!command) {
            const embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(client.localization.get('errors.unknownCommand'));
            return message.channel.send({ embeds: [embed] });
        }

        try {
            await command.execute(message, args, client);
        } catch (error) {
            console.error(`❌ Error executing command '${command.name}':`, error);
            const embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(client.localization.get('errors.unknownError'));
            message.channel.send({ embeds: [embed] });
        }
    },
};