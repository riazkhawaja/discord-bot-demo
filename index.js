import { Client, GatewayIntentBits, REST, Routes, ApplicationCommandType, ApplicationCommandOptionType } from 'discord.js';
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
import { config } from 'dotenv';

// Please set the bot token and client/application id as TOKEN and CLIENT_ID respectively, in .env
config();

(async () => {
    const commands = [
        {
            name: "echo",
            description: "repeat what you said",
            type: ApplicationCommandType.ChatInput,
            options: [{
                name: "anything",
                description: "just type anything",
                type: ApplicationCommandOptionType.String,
                required: true
            }]
        },
        {
            name: "select",
            description: "Select the correct answer to 1 + 1",
            type: ApplicationCommandType.ChatInput,
            options: [{
                name: "answer",
                description: "the options",
                type: ApplicationCommandOptionType.Number,
                required: true,
                choices: [
                    { name: "1", value: 1 },
                    { name: "2", value: 2 },
                    { name: "0", value: 0 },
                    { name: "11", value: 11 }
                ]
            }]
        }
    ];

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
    console.log("Successfully set application commands.");

    client.login(process.env.TOKEN);
})();

client.on("interactionCreate", async interaction => {
    if (interaction.isChatInputCommand()) {
        switch (interaction.commandName) {
            case "echo":
                await interaction.reply(interaction.options.get("anything").value);
                break;
            case "select":
                const msg = interaction.options.get("answer").value == 1 ? "You have correctly selected 1!" : "Wrong answer, try again";
                await interaction.reply(msg);
                break;
        }
    }
});

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "!");
});

