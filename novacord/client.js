import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class NovaClient {
  constructor(options = {}) {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.commands = new Collection();

    // Events laden
    const eventsPath = path.join(__dirname, 'events');
    if (fs.existsSync(eventsPath)) {
      const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));
      for (const file of eventFiles) {
        import(path.join(eventsPath, file)).then(eventModule => {
          const event = eventModule.default;
          if (event.once) {
            this.client.once(event.name, (...args) => event.execute(...args, this.client));
          } else {
            this.client.on(event.name, (...args) => event.execute(...args, this.client));
          }
        });
      }
    }

    // Commands laden
    const commandsPath = path.join(__dirname, 'commands');
    if (fs.existsSync(commandsPath)) {
      const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
      for (const file of commandFiles) {
        import(path.join(commandsPath, file)).then(cmdModule => {
          const command = cmdModule.command;
          if (command?.data?.name) {
            this.commands.set(command.data.name, command);
          }
        });
      }
    }

    // Interaction handler
    this.client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;
      const command = this.commands.get(interaction.commandName);
      if (!command) return;

      try {
        await command.execute(interaction, this.client);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'Es gab einen Fehler beim Ausführen des Befehls.', ephemeral: true });
      }
    });
  }

  start() {
    this.client.login(process.env.TOKEN);
  }
}