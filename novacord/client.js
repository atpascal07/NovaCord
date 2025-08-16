import { Client, GatewayIntentBits } from 'discord.js';

export class NovaClient {
  constructor() {
    this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
    this.client.once('ready', () => {
      console.log(`Eingeloggt als ${this.client.user.tag}`);
    });
  }

  start() {
    this.client.login(process.env.TOKEN);
  }
}