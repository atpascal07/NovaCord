import {
  Client,
  GatewayIntentBits,
  Collection,
  REST,
  Routes,
  SlashCommandBuilder
} from "discord.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import dotenv from "dotenv";
import { printReady } from "./utils/banner.js"; // ✅ neue Funktion aus banner.js

dotenv.config();

function toArray(iterable) {
  return Array.isArray(iterable) ? iterable : Array.from(iterable ?? []);
}

function isCommandModule(mod) {
  const m = mod?.default ?? mod;
  return m && m.data && m.execute;
}

export class NovaClient extends Client {
  constructor(options = {}) {
    const { intents, ...rest } = options;
    super({
      intents: intents ?? [GatewayIntentBits.Guilds],
      ...rest
    });

    this.commands = new Collection();

    this.once("ready", async () => {
      try {
        const version = "0.0.3";
        printReady(this, { version, commandCount: this.commands.size, style: "table" });
      } catch (e) {
        console.error("[NovaCord] Fehler bei der Startmeldung:", e);
      }
    });

    this.on("interactionCreate", async (interaction) => {
      if (!interaction.isChatInputCommand()) return;
      const cmd = this.commands.get(interaction.commandName);
      if (!cmd) return;
      try {
        await cmd.execute(interaction, this);
      } catch (err) {
        console.error("[NovaCord] Command-Error:", err);
        try {
          if (interaction.deferred || interaction.replied) {
            await interaction.editReply({ content: "Es ist ein Fehler aufgetreten." });
          } else {
            await interaction.reply({ content: "Es ist ein Fehler aufgetreten.", ephemeral: true });
          }
        } catch {}
      }
    });
  }

  async start(token = process.env.TOKEN) {
    if (!token || typeof token !== "string") {
      throw new Error("Kein Bot-Token gefunden! Lege TOKEN in .env an oder übergib es an start(token)");
    }
    return this.login(token);
  }

  async loadCommands(dir = "./commands") {
    const base = path.isAbsolute(dir) ? dir : path.join(process.cwd(), dir);
    if (!fs.existsSync(base)) return this.commands;

    const entries = await fs.promises.readdir(base, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(base, entry.name);
      if (entry.isDirectory()) {
        await this.loadCommands(p);
      } else if (entry.isFile() && (p.endsWith(".js") || p.endsWith(".mjs"))) {
        const mod = await import(pathToFileURL(p).href);
        if (isCommandModule(mod)) {
          const m = mod.default ?? mod;
          const name = m.data?.name;
          if (name) this.commands.set(name, m);
        }
      }
    }
    return this.commands;
  }

  async deployCommands({ clientId = process.env.CLIENT_ID, guildId = process.env.GUILD_ID } = {}) {
    if (!clientId) throw new Error("CLIENT_ID wird benötigt, um Commands zu deployen.");
    const list = toArray(this.commands?.values?.() ?? []);
    const body = list
      .map(c => c?.data)
      .filter(Boolean)
      .map(d => (typeof d.toJSON === "function" ? d.toJSON() : d));

    const token = process.env.TOKEN;
    if (!token) throw new Error("TOKEN wird für den REST-Deploy benötigt.");

    const rest = new REST({ version: "10" }).setToken(token);

    if (guildId) {
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body });
      return { scope: "guild", count: body.length, guildId };
    } else {
      await rest.put(Routes.applicationCommands(clientId), { body });
      return { scope: "global", count: body.length };
    }
  }

  addHelpCommand(name = "help", { embed = true } = {}) {
    const helpCommand = {
      data: new SlashCommandBuilder()
        .setName(name)
        .setDescription("Zeigt eine Liste aller verfügbaren Commands an"),
      execute: async (interaction) => {
        const list = this.commands.map(cmd => {
          const desc = cmd.data.description || "Keine Beschreibung";
          return `\`/${cmd.data.name}\` - ${desc}`;
        }).join("\n");

        if (embed) {
          await interaction.reply({
            embeds: [{
              title: "📖 Hilfe",
              description: list.length ? list : "Keine Commands gefunden.",
              color: 0x5865F2
            }],
            ephemeral: true
          });
        } else {
          await interaction.reply({
            content: list.length ? list : "Keine Commands gefunden.",
            ephemeral: true
          });
        }
      }
    };

    this.commands.set(helpCommand.data.name, helpCommand);
    return helpCommand;
  }
}
