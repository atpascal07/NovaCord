import { Client, GatewayIntentBits, Collection } from "discord.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NovaClient extends Client {
  constructor(options = {}) {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      ...options,
    });

    this.commands = new Collection();
    this.loadCommands();
    this.blacklist = new Set();
  }

  loadCommands() {
    const commandsPath = path.join(__dirname, "commands");
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"));

    for (const file of files) {
      import(path.join(commandsPath, file)).then((cmd) => {
        if (cmd && cmd.default?.name) {
          this.commands.set(cmd.default.name, cmd.default);
        }
      });
    }
  }

  addToBlacklist(id) {
    this.blacklist.add(id);
  }

  async handleMessage(message) {
    if (message.author.bot) return;
    if (this.blacklist.has(message.author.id)) return;

    const prefix = "!";
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = this.commands.get(commandName);
    if (!command) return;

    try {
      await command.execute(message, args, this);
    } catch (err) {
      console.error(err);
      await message.reply("❌ Fehler beim Ausführen des Commands.");
    }
  }
}
