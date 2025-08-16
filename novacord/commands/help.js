const { EmbedBuilder, Colors } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Shows help information',
  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Available commands: help, blacklist, setstatus')
      .setColor(Colors.Blurple);
    await message.reply({ embeds: [embed] });
  },
  async executeSlash(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('Available commands: help, blacklist, setstatus')
      .setColor(Colors.Blurple);
    await interaction.reply({ embeds: [embed] });
  }
};