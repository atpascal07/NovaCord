module.exports = {
  name: 'setstatus',
  description: 'Set the bot status',
  async execute(message, args, client) {
    const text = args.join(' ') || 'NovaCord';
    client.user.setActivity(text);
    message.reply(`✅ Status gesetzt: ${text}`);
  },
  async executeSlash(interaction, client) {
    const text = interaction.options.getString('text') || 'NovaCord';
    client.user.setActivity(text);
    interaction.reply(`✅ Status gesetzt: ${text}`);
  }
};