const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const path = require('path');

class NovaClient extends Client {
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
    const commandsPath = path.join(__dirname, 'commands');
    const files = fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'));

    for (const file of files) {
      const cmd = require(path.join(commandsPath, file));
      if (cmd && cmd.name) {
        this.commands.set(cmd.name, cmd);
      }
    }
  }

  addToBlacklist(id) {
    this.blacklist.add(id);
  }

  async handleMessage(message) {
    if (message.author.bot) return;
    if (this.blacklist.has(message.author.id)) return;

    const prefix = '!';
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmdName = args.shift().toLowerCase();

    const cmd = this.commands.get(cmdName);
    if (!cmd) return;

    try {
      await cmd.execute(message, args, this);
    } catch (err) {
      console.error(err);
      message.reply('❌ Fehler beim Ausführen des Commands.');
    }
  }
}

module.exports = { NovaClient };