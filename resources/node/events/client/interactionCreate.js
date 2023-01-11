module.exports = {
    name: 'interactionCreate',
    async execute(interaction, bot) {
        if (interaction.isChatInputCommand()){
            const {commands} = bot;
            const {commandName} = interaction;
            const command = commands.get(commandName);
            if (!command) return;
            try {
                await command.execute(interaction, bot);

            } catch (e) {
                console.error(e);
                await interaction.reply({
                    content: `Hey, something went wrong....WOW!`,
                    ephemeral: true
                });
            }
        }

    }
}
