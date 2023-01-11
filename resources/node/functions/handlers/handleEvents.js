const fs = require('fs');
const config = require("../../config.json");

module.exports = (bot) => {
    bot.handleEvents = async () => {
        const eventFolders = fs.readdirSync(`${config.AppLocation}/events`);


        for (const folder of eventFolders){
            const eventFiles = fs.readdirSync(`${config.AppLocation}/events/${folder}`).filter(file => file.endsWith('.js'));

            switch (folder){
                case "client":
                    for (const file of eventFiles) {
                        const event = require(`../../events/${folder}/${file}`);
                        if(event.once) bot.once(event.name, (...args) => event.execute(...args, bot));
                        else bot.on(event.name, (...args) => event.execute(...args, bot));

                    }
                    break;
                default:
                    break;

            }
        }
    }
}
