import {
  SlashCommandBuilder,
  EmbedBuilder,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
  ActionRowBuilder
} from "discord.js";

/**
 * Der interne Help Command.
 * Dieser Command ist "versteckt" und wird nicht im user-commands-Ordner angezeigt.
 */
export default {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Zeigt eine Übersicht aller Commands an")
    .setDMPermission(false),

  hidden: true, // <-- wichtig, Endnutzer soll ihn nicht sehen/bearbeiten

  async execute(interaction, client) {
    const categories = {};

    for (const [, cmd] of client.commands) {
      if (cmd.hidden) continue; // versteckte Commands wie /help selbst überspringen

      const category =
        cmd.category ??
        "Allgemein"; // falls Commands im Framework Kategorien haben
      if (!categories[category]) categories[category] = [];
      categories[category].push(cmd);
    }

    // 📌 Auswahlmenü für Kategorien
    const options = Object.keys(categories).map(cat =>
      new StringSelectMenuOptionBuilder()
        .setLabel(cat)
        .setValue(cat.toLowerCase())
        .setDescription(`${categories[cat].length} Befehle`)
    );

    const menu = new StringSelectMenuBuilder()
      .setCustomId("help-menu")
      .setPlaceholder("Wähle eine Kategorie")
      .addOptions(options);

    const row = new ActionRowBuilder().addComponents(menu);

    const embed = new EmbedBuilder()
      .setTitle("📖 Hilfe")
      .setDescription("Wähle eine Kategorie, um die Befehle zu sehen.")
      .setColor(0x5865f2);

    const reply = await interaction.reply({
      embeds: [embed],
      components: [row],
      ephemeral: true
    });

    // 📌 Collector für Auswahlmenü
    const collector = reply.createMessageComponentCollector({
      filter: i =>
        i.isStringSelectMenu() && i.customId === "help-menu" && i.user.id === interaction.user.id,
      time: 60_000
    });

    collector.on("collect", async i => {
      const cat = i.values[0];
      const cmds = categories[Object.keys(categories).find(c => c.toLowerCase() === cat)];

      const helpEmbed = new EmbedBuilder()
        .setTitle(`📂 ${cat} Commands`)
        .setColor(0x5865f2)
        .setDescription(
          cmds
            .map(
              c =>
                `**/${c.data.name}** — ${c.data.description || "Keine Beschreibung"}`
            )
            .join("\n")
        );

      await i.update({ embeds: [helpEmbed], components: [row] });
    });

    collector.on("end", () => {
      reply.edit({ components: [] }).catch(() => {});
    });
  }
};
