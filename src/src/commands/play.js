const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "play",
    description: "Play a song from YouTube or a supported platform.",
    async execute(message, args, client) {
        const query = args.join(" ");

        const embed = new EmbedBuilder().setColor(Colors.Blue);

        if (!query) {
            embed.setDescription(client.localization.get('commands.play.noQuery'));
            return message.channel.send({ embeds: [embed] });
        }

        try {
            const voiceChannel = message.member.voice.channel;
            if (!voiceChannel) {
                embed.setDescription("⛔ " + client.localization.get('errors.notAuthorized'));
                return message.channel.send({ embeds: [embed] });
            }

            await client.distube.play(voiceChannel, query, {
                textChannel: message.channel,
                member: message.member,
                metadata: { message },
            });

            embed.setDescription(client.localization.get('commands.play.requestReceived'));
            return message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error("❌ Error executing !play command:", error);
            embed.setDescription(client.localization.get('errors.unknownError'));
            return message.channel.send({ embeds: [embed] });
        }
    },
};