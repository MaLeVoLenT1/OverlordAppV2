require('dotenv').config();
const {token} = process.env;
const { Client, GatewayIntentBits, Collection} = require('discord.js');
const config = require("./config.json");

// Built In with Node.js, had to install a node package to run. (File System Module)
const fs = require('fs');

// Create a new Discord client
const bot = new Client({intents: [GatewayIntentBits.Guilds]});

bot.commands = new Collection();
bot.commandArray = [];

// Uses readdirSync to get a list of all the directories within the specified folder structure.
const functionFolders = fs.readdirSync(`${config.AppLocation}/functions`);

for (const folder of functionFolders){
    const functionFiles = fs.readdirSync(`${config.AppLocation}/functions/${folder}`).filter((file) => file.endsWith(".js"));
    for (const file of functionFiles) require(`./functions/${folder}/${file}`)(bot);
}

bot.handleEvents();
bot.handleCommands();

// Log the client in
bot.login(config.token).catch((err)=>console.log(err));
