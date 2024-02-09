import { Client, GatewayIntentBits, REST, Routes, ApplicationCommandType, ApplicationCommandOptionType, EmbedBuilder } from 'discord.js';
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
        },
        {
            name: "embed",
            description: "Showcase an embed"
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
                const msg = interaction.options.get("answer").value == 2 ? "You have correctly selected 2!" : "Wrong answer, try again";
                await interaction.reply(msg);
                break;
            case "embed":
                const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("Title of embed")
                .setURL("https://google.com")
                .setAuthor({
                    name: interaction.user.tag,
                    iconURL: interaction.user.displayAvatarURL()
                })
                .setDescription("description")
                .setThumbnail(interaction.user.displayAvatarURL())
                .setImage(interaction.user.displayAvatarURL())
                .addFields(
                    {
                        name: "field 1", value: "value 1"
                    },
                    {
                        name: "field 2", value: "value 2", inline: true
                    },
                    {
                        name: "field 3", value: "value 3", inline: true
                    },
                )
                .setTimestamp()
                .setFooter({ text: "i am a footer" })

                interaction.reply({ embeds: [embed] })
        }
    }
});

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag + "!");
});

