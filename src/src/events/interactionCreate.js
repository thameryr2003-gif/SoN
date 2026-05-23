const { InteractionType, EmbedBuilder, Colors } = require("discord.js");

const pauseButton = require("../buttons/pause");
const resumeButton = require("../buttons/resume");
const skipButton = require("../buttons/skip");
const stopButton = require("../buttons/stop");
const volumeUpButton = require("../buttons/volumeUp");
const volumeDownButton = require("../buttons/volumeDown");
const repeatButton = require("../buttons/repeat");

module.exports = {
    name: "interactionCreate",
    async execute(interaction, client) {
        try {
            if (interaction.type !== InteractionType.MessageComponent) return;

            if (!interaction.isButton()) return;

            const buttonHandlers = {
                pause: pauseButton,
                resume: resumeButton,
                skip: skipButton,
                stop: stopButton,
                volumeUp: volumeUpButton,
                volumeDown: volumeDownButton,
                repeat: repeatButton,
            };

            const handler = buttonHandlers[interaction.customId];
            if (handler) {
                await handler.execute(interaction, client);
            } else {
                const embed = new EmbedBuilder()
                    .setColor(Colors.Red)
                    .setDescription(client.localization.get('errors.unknownCommand'));
                await interaction.reply({ embeds: [embed], ephemeral: true });
            }
        } catch (error) {
            console.error("❌ Error handling interaction:", error);
            if (interaction.replied || interaction.deferred) {
                interaction
                    .followUp({ content: client.localization.get('misc.unknownError'), ephemeral: true })
                    .catch(console.error);
            } else {
                interaction
                    .reply({ content: client.localization.get('misc.unknownError'), ephemeral: true })
                    .catch(console.error);
            }
        }
    },
};