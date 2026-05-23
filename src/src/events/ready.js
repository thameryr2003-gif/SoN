const { ActivityType } = require("discord.js");
const chalk = require("chalk");
const moment = require("moment");
require("moment-duration-format");
const os = require("os");
const config = require("../../config.js");

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        try {
            const banner = `
${chalk.blueBright(`
██╗    ██╗██╗ ██████╗██╗  ██╗    ███████╗████████╗██╗   ██╗██████╗ ██╗ ██████╗ 
██║    ██║██║██╔════╝██║ ██╔╝    ██╔════╝╚══██╔══╝██║   ██║██╔══██╗██║██╔═══██╗
██║ █╗ ██║██║██║     █████╔╝     ███████╗   ██║   ██║   ██║██║  ██║██║██║   ██║
██║███╗██║██║██║     ██╔═██╗     ╚════██║   ██║   ██║   ██║██║  ██║██║██║   ██║
╚███╔███╔╝██║╚██████╗██║  ██╗    ███████║   ██║   ╚██████╔╝██████╔╝██║╚██████╔╝
 ╚══╝╚══╝ ╚═╝ ╚═════╝╚═╝  ╚═╝    ╚══════╝   ╚═╝    ╚═════╝ ╚═════╝ ╚═╝ ╚═════╝ 
`)}
${chalk.greenBright("            © Wick® Studio")}    
`;
            console.log(banner);
            console.log(chalk.yellowBright(`✅ Logged in as ${client.user.tag}!`));
            console.log('Code by Wick Studio');
            console.log('join us at : discord.gg/wicks');

            const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
            const uptime = moment.duration(client.uptime).format(" D [days], H [hrs], m [mins], s [secs]");
            const cpuLoad = os.loadavg()[0].toFixed(2);

            console.log(chalk.cyanBright(`📁 Guilds: ${client.guilds.cache.size}`));
            console.log(chalk.cyanBright(`👥 Users: ${client.users.cache.size}`));
            console.log(chalk.cyanBright(`🖥️ Memory Usage: ${memoryUsage} MB`));
            console.log(chalk.cyanBright(`🖥️ CPU Load (1m): ${cpuLoad}`));
            console.log(chalk.cyanBright(`⏱️ Uptime: ${uptime}`));

            try {
                const presence = await client.user.setActivity("🔊 Discord Player!", { type: ActivityType.Playing });
                if (presence.activities.length > 0) {
                    console.log(chalk.magentaBright(`🔔 Activity set to "${presence.activities[0].name}"`));
                } else {
                    console.log(chalk.magentaBright(`🔔 Activity set to "🔊 Discord Player!"`));
                }
            } catch (err) {
                console.error(chalk.redBright("❌ Failed to set initial activity:"), err);
            }
            console.log(chalk.greenBright("✅ Bot is fully operational and ready to serve!"));
            console.log(chalk.yellowBright("📜 Copyright Wick® Studio"));
        } catch (error) {
            console.error(chalk.redBright("❌ Error in ready event:"), error);
        }
    },
};