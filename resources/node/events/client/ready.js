module.exports = {
    name: 'ready',
    once: true,
    async execute(bot) {
        console.log(`Ready!!! ${bot.user.tag} is logged in and online.`);
        // Create an invite link for the bot
        const inviteLink = bot.generateInvite({scopes: ['bot'], permissions: ['Administrator']});
        console.log(`Invite link: ${inviteLink}`);
    }
}
