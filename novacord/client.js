import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

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
    if (!token) throw new Error('Kein Bot-Token gefunden!');
    await this.login(token);
  }
}
