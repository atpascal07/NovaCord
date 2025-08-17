// Beispielhafte client.js mit HelpCommand
import { Client, GatewayIntentBits, Collection } from "discord.js";
import dotenv from "dotenv";
import { banner } from "./utils/banner.js";
dotenv.config();

export class NovaClient extends Client {
  constructor(options = {}) {
    super({ intents: options.intents ?? [GatewayIntentBits.Guilds] });
    this.commands = new Collection();
    this.helpEnabled = false;

    this.once("ready", () => {
      console.log(banner({
        username: this.user?.tag ?? "Unbekannt",
        id: this.user?.id ?? "-",
        guilds: this.guilds?.cache?.size ?? 0,
        version: "0.1.14"
      }));
    });

    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const cmd = this.commands.get(interaction.commandName);
      if (!cmd) return;
      try {
        await cmd.execute(interaction, this);
      } catch (err) {
        console.error("[NovaCord] Fehler im Command:", err);
        await interaction.reply({ content: "Es ist ein Fehler aufgetreten.", ephemeral: true });
      }
    });
  }

  addHelpCommand() {
    this.helpEnabled = true;
    this.commands.set("help", {
      data: { name: "help", description: "Zeigt alle verfügbaren Befehle an" },
      execute: async (interaction, client) => {
        const list = [...client.commands.keys()].join(", ");
        await interaction.reply({ content: `Verfügbare Befehle: ${list}` });
      }
    });
  }

  async start(token = process.env.TOKEN) {
    if (!token) throw new Error("Kein Token gefunden!");
    return this.login(token);
  }
}
