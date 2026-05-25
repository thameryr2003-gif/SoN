process.env.DISCORDJS_DEFAULT_GATEWAY_INTENTS = "1536";
require('@snazzah/davey');
const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const http = require('http');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

const distube = new DisTube(client, {
  plugins: [new YouTubePlugin()],
  emitNewSongOnly: true,
});

const PORT = process.env.PORT || 3000;
http
  .createServer((_, res) => {
    res.writeHead(200);
    res.end('OK');
  })
  .listen(PORT, '0.0.0.0', () => console.log('HTTP:', PORT));

client.once('ready', () => {
  console.log('✅ البوت شغال ومتصل الآن بـ ديسكورد:', client.user.tag);
});

distube.on('playSong', (queue, song) => {
  queue.textChannel?.send(`▶️ **${song.name}**`);
});

distube.on('error', (channel, err) => {
  console.error('[DisTube]', err);
  channel?.send(`❌ ${err.message}`).catch(() => {});
});

client.on('messageCreate', async (message) => {
  if (message.author.bot || !message.content.startsWith('ت ')) return;

  const query = message.content.slice(2).trim();
  const voice = message.member?.voice?.channel;

  if (!voice) return message.reply('❌ ادخل قناة صوتية أولاً!');
  if (!query) return message.reply('❌ مثال:\n`ت عراقي`\n`ت https://youtube.com...`');

  const cmd = query.split(/\s+/)[0].toLowerCase();

  try {
    if (cmd === 'س' || cmd === 'skip') {
      const q = distube.getQueue(message);
      if (!q) return message.reply('❌ ما في تشغيل حالياً.');
      q.skip();
      return message.reply('⏭️ تم التخطي.');
    }
    if (cmd === 'وقف' || cmd === 'stop') {
      const q = distube.getQueue(message);
      if (!q) return message.reply('❌ ما في تشغيل حالياً.');
      q.stop();
      return message.reply('⏹️ تم الإيقاف وخروج البوت.');
    }

    console.log('🔍 تشغيل:', query);
    await distube.play(voice, query, {
      member: message.member,
      textChannel: message.channel,
      message,
    });
  } catch (e) {
    console.error(e);
    message.reply(`❌ ${e.message}`);
  }
});

if (!process.env.DISCORD_TOKEN) {
  console.error('DISCORD_TOKEN مفقود');
  process.exit(1);
}

client.login(process.env.DISCORD_TOKEN);
