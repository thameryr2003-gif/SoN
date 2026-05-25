require('@snazzah/davey');
const { Client, GatewayIntentBits } = require('discord.js');
const { DisTube } = require('distube');
const { YouTubePlugin } = require('@distube/youtube');
const { getMaxProtocolVersion } = require('@discordjs/voice');
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
  console.log('✅ متصل:', client.user.tag);
  console.log('DAVE:', getMaxProtocolVersion());
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

  if (!voice) return message.reply('❌ ادخل قناة صوتية!');
  if (!query) return message.reply('❌ مثال:\n`ت عراقي`\n`ت https://youtube.com/watch?v=...`');

  const cmd = query.split(/\s+/)[0].toLowerCase();
  const rest = query.slice(cmd.length).trim();

  try {
    if (cmd === 'س' || cmd === 'skip') {
      const q = distube.getQueue(message);
      if (!q) return message.reply('❌ ما في تشغيل.');
      q.skip();
      return message.reply('⏭️ تم التخطي.');
    }
    if (cmd === 'وقف' || cmd === 'stop') {
      const q = distube.getQueue(message);
      if (!q) return message.reply('❌ ما في تشغيل.');
      q.stop();
      return message.reply('⏹️ تم الإيقاف.');
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
