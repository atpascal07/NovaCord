module.exports = {
  name: 'blacklist',
  description: 'Blacklist a user by ID',
  async execute(message, args, client) {
    const id = args[0];
    if (!id) return message.reply('Bitte eine ID angeben.');
    client.addToBlacklist(id);
    message.reply(`✅ Nutzer geblacklistet: ${id}`);
  },
  async executeSlash(interaction, client) {
    const id = interaction.options.getString('id');
    if (!id) return interaction.reply('Bitte eine ID angeben.');
    client.addToBlacklist(id);
    interaction.reply(`✅ Nutzer geblacklistet: ${id}`);
  }
};