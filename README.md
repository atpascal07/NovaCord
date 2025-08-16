# NovaCord

NovaCord ist ein leichtgewichtiges **discord.js**-Framework (ESM) mit
einem Start-Banner ähnlich wie bei EzCord sowie einfachem Command-Handling.

## Installation
```bash
npm install novacord
```

## Quickstart
```js
import { config } from "dotenv";
import { NovaClient } from "novacord";

config();

const client = new NovaClient({
  startMessage: {           // Start-Banner Optionen
    banner: true,           // Konsole: Banner anzeigen (default true)
    send: true              // Optional: Nachricht in START_CHANNEL_ID posten (default false)
  }
});

await client.start(); // nutzt TOKEN aus .env
```

### Optional: Startnachricht in einem Kanal
Lege die Umgebungsvariable `START_CHANNEL_ID` fest, damit NovaCord beim Start
eine kurze Status-Nachricht in diesem Kanal postet.

```env
TOKEN=dein_discord_token
START_CHANNEL_ID=123456789012345678
CLIENT_ID=deine_app_id    # für deployCommands()
GUILD_ID=optional_guild   # für schnelle Guild-Registrierung
```

## Commands (Struktur)
Jeder Command exportiert `data` (SlashCommandBuilder) und `execute` (Handler).

```js
// ping.js
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Pong!"),
  async execute(interaction, client) {
    await interaction.reply("🏓 Pong!");
  }
};
```

## API-Kurzüberblick
- `new NovaClient(options?)`
- `client.start(token?)`
- `client.loadCommands(dir)`
- `client.deployCommands({ clientId, guildId })`
- `client.commands`

## Lizenz
MIT
