import { Client, GatewayIntentBits } from 'discord.js';
const client = new Client({ intents: [ GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent ] })
import { config } from 'dotenv';

config();

client.on('messageCreate', message => {
    if (message.content.toLowerCase() == "ping") {
        message.reply("pong!");
    }
});

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "!");
});

client.login(process.env.TOKEN);
