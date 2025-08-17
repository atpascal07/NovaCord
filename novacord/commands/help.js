import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Zeigt eine Liste aller verfügbaren Commands an."),
  async execute(interaction, client) {
    const list = client.commands.map(cmd => {
      const desc = cmd.data.description || "Keine Beschreibung";
      return `\`/${cmd.data.name}\` - ${desc}`;
    }).join("\n");

    await interaction.reply({
      embeds: [{
        title: "📖 Hilfe",
        description: list.length ? list : "Keine Commands gefunden.",
        color: 0x5865F2
      }],
      ephemeral: true
    });
  }
};
