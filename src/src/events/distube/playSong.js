const { ActivityType } = require("discord.js");
const sendMusicCard = require('../../utils/sendMusicCard');

module.exports = {
    name: 'playSong',
    async execute(queue, song, client) {
        try {
            if (!queue.textChannel) {
                if (song.metadata && song.metadata.message && song.metadata.message.channel) {
                    queue.textChannel = song.metadata.message.channel;
                    console.log('✅ Text channel successfully assigned from metadata.');
                } else {
                    console.error('❌ No valid text channel found for queue.');
                    return;
                }
            }

            if (client.config.enableLogging) {
                console.log(client.localization.get('events.playSong', { song: song.name, user: song.user.tag }));
            }

            if (queue.currentMessage) {
                await queue.currentMessage.delete().catch((err) => {
                    if (client.config.enableLogging) console.error("❌ Error deleting previous message:", err);
                });
                queue.currentMessage = undefined;
                queue.initiatorId = undefined;
            }

            console.log('ℹ️ Attempting to send music card...');
            await sendMusicCard(queue, song, client.localization);
            console.log('✅ Music card sent successfully.');
        } catch (error) {
            console.error('❌ Error in playSong event:', error);
        }
    },
};