const { EmbedBuilder, Colors } = require("discord.js");

module.exports = {
    name: "error",
    execute(queue, error) {
        console.error("❌ DisTube Error:", error);

        if (!queue.textChannel && queue.metadata && queue.metadata.message && queue.metadata.message.channel) {
            queue.textChannel = queue.metadata.message.channel;
        }

        if (queue && queue.textChannel && typeof queue.textChannel.send === "function") {
            const embed = new EmbedBuilder()
                .setColor(Colors.Red)
                .setDescription(`⛔ An error encountered: ${error.toString().slice(0, 2000)}`);
            queue.textChannel.send({ embeds: [embed] }).catch(console.error);
        } else {
            console.error("❌ Error channel is not text-based. Cannot send error message.");
        }
    },
};