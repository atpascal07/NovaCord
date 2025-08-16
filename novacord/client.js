import { Client, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

export class NovaClient extends Client {
  constructor(options = {}) {
    super({
      intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
      ...options,
    });
    this.commands = new Collection();
  }

  async start(token = process.env.TOKEN) {
    if (!token) throw new Error("Kein Bot-Token gefunden!");
    await this.login(token);
  }

  async loadCommands(commandsPath = "./commands") {
    const __dirname = path.resolve();
    const fullPath = path.join(__dirname, commandsPath);
    if (!fs.existsSync(fullPath)) return;

    const commandFiles = fs.readdirSync(fullPath).filter(f => f.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(fullPath, file);
      const { command } = await import(`file://${filePath}`);
      if (command?.data && command?.execute) {
        this.commands.set(command.data.name, command);
      }
    }

    this.on("interactionCreate", async interaction => {
      if (!interaction.isChatInputCommand()) return;
      const cmd = this.commands.get(interaction.commandName);
      if (!cmd) return;
      try {
        await cmd.execute(interaction);
      } catch (err) {
        console.error(err);
        await interaction.reply({ content: "❌ Fehler beim Ausführen des Commands", ephemeral: true });
      }
    });
  }

  async deployCommands({ clientId, guildId }) {
    if (!this.commands.size) return;

    const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
    const body = this.commands.map(cmd => cmd.data.toJSON());

    try {
      if (guildId) {
        await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
        console.log("Guild-Commands deployed!");
      } else {
        await rest.put(Routes.applicationCommands(clientId), { body });
        console.log("Global-Commands deployed!");
      }
    } catch (error) {
      console.error("Fehler beim Deployen:", error);
    }
  }
}
