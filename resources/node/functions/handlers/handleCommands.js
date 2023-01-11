const {REST, Routes} = require('discord.js');

const fs = require('fs');
const config = require("../../config.json");
module.exports = (bot) => {
    bot.handleCommands = async() => {
        const commandFolders = fs.readdirSync(`${config.AppLocation}/commands`);

        for (const folder of commandFolders){
            const commandFiles = fs.readdirSync(`${config.AppLocation}/commands/${folder}`).filter(file => file.endsWith('.js'));

            const {commands, commandArray} = bot;
            for (const file of commandFiles){
                const command = require(`../../commands/${folder}/${file}`);
                commands.set(command.data.name, command);
                commandArray.push(command.data.toJSON());
                console.log(`Command: '${command.data.name}' Passed through the handler.`);
            }
        }

        const botID = '1062206022393024542';
        const guildID = '926546678385872977';
        const rest = new REST({version: '9'}).setToken(config.token);
        try {
            console.log("Started refreshing application (/) commands.");

            await rest.put(Routes.applicationCommands(botID),{
                body: bot.commandArray,
            });
        }catch (e) {
            console.log(e);
        }
    };
};
