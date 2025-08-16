import { Client, GatewayIntentBits, Collection, REST, Routes, EmbedBuilder } from "discord.js";
import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import dotenv from "dotenv";
import { banner } from "./utils/banner.js";

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
    const { intents, startMessage, ...rest } = options;
    super({
      intents: intents ?? [GatewayIntentBits.Guilds],
      ...rest
    });

    this.commands = new Collection();
    this._startMessage = {
      banner: startMessage?.banner ?? true,
      send: startMessage?.send ?? false
    };

    this.once("ready", async () => {
      try {
        if (this._startMessage.banner) {
          const pkgVersion = "0.1.8";
          // Guilds kann bei Sharding anders sein; hier einfache Zählung
          const guildCount = this.guilds?.cache?.size ?? 0;
          console.log(
            banner({
              username: this.user?.tag ?? "Unbekannt",
              id: this.user?.id ?? "-",
              guilds: guildCount,
              version: pkgVersion
            })
          );
        }

        if (this._startMessage.send && process.env.START_CHANNEL_ID) {
          const ch = await this.channels.fetch(process.env.START_CHANNEL_ID).catch(() => null);
          if (ch && ch.isTextBased()) {
            const emb = new EmbedBuilder()
              .setTitle("NovaCord gestartet")
              .setDescription("Der Bot ist erfolgreich online.")
              .addFields(
                { name: "Bot", value: `${this.user.tag} (${this.user.id})`, inline: true },
                { name: "Guilds", value: String(this.guilds.cache.size), inline: true }
              )
              .setTimestamp();
            await ch.send({ embeds: [emb] }).catch(() => {});
          }
        }
      } catch (e) {
        console.error("[NovaCord] Fehler beim Start-Banner:", e);
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
}
