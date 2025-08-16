# NovaCord

NovaCord ist ein leichtgewichtiges **Framework für discord.js** (ESM) mit
komfortablem **Command-Loader**, **Auto-Deploy** der Slash Commands und einer
**professionellen Startmeldung in der Konsole** – ähnlich wie man es aus
ausgereiften Bot-Frameworks kennt.

> Ziel: Weniger Boilerplate, schneller produktiv, klare Struktur.

---

## ✨ Features

- **ESM-first**: `import { NovaClient } from "novacord";`
- **Command-Loader**: Lädt rekursiv alle Commands aus einem Ordner (z. B. `./commands`).
- **Slash-Command Deploy**: Ein Aufruf registriert alle Commands global oder pro Guild.
- **Startmeldung in der Konsole**: Übersichtlich mit Bot-Infos (Name, ID, d.js-Version, Guilds, Latenz, Command-Anzahl).
- **Robustes Error-Handling**: Saubere Fehlerrückmeldungen an den Nutzer (ephemeral), Logging in der Konsole.
- **.env-Unterstützung**: Token & IDs sicher über Umgebungsvariablen.

---

## 📦 Installation

```bash
npm install novacord
# oder lokal testen:
# npm install ./pfad/zu/deinem/novacord
```

---

## 🚀 Schnellstart (Endnutzer)

**.env**
```env
TOKEN=dein_discord_bot_token
CLIENT_ID=123456789012345678
# GUILD_ID=optional_fuer_schnellen_guild_deploy
```

**index.js (dein Bot-Projekt)**
```js
import { config } from "dotenv";
import { NovaClient } from "novacord";

config();

const client = new NovaClient({
  // Optional: zusätzliche Intents oder Client-Optionen
  // intents: [GatewayIntentBits.Guilds]
});

await client.loadCommands("./commands");   // lädt alle Commands
await client.deployCommands({              // registriert sie bei Discord
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID           // weglassen = global deploy
});

client.start();                            // nutzt TOKEN aus .env
```

**Beispiel-Command: `commands/ping.js`**
```js
import { SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Antwortet mit Pong!"),
  async execute(interaction, client) {
    await interaction.reply("🏓 Pong!");
  }
};
```

---

## 🔧 API-Überblick

- `new NovaClient(options?)` – erstellt den Bot-Client (ESM).
- `client.start(token?)` – startet den Bot; nimmt automatisch `process.env.TOKEN`, wenn kein Token übergeben wird.
- `client.loadCommands(dir = "./commands")` – lädt rekursiv alle Command-Module. Ein Command muss `data` (SlashCommandBuilder) und `execute(interaction, client)` exportieren.
- `client.deployCommands({ clientId, guildId })` – deployt die geladenen Commands. Mit `guildId` schnell pro-Guild, ohne `guildId` global.

---

## 📋 Startmeldung (Konsole)

Beim `ready`-Event gibt NovaCord automatisch eine formatierte Tabelle mit Kerninfos aus:
- Bot-Tag und ID
- discord.js-Version
- Anzahl geladener Commands
- Anzahl Guilds
- WebSocket-Latenz

Diese Ausgabe hilft im Betrieb und auf Hostern (z. B. Docker/Panel), direkt zu sehen, ob alles korrekt geladen wurde.

---

## 🧰 Fehlersuche

- **`Kein Bot-Token gefunden!`** – Lege das Token in `.env` als `TOKEN` ab oder übergib es an `start(token)`.
- **`CLIENT_ID wird benötigt`** – Für `deployCommands()` muss die Client-ID deiner Anwendung gesetzt sein.
- **Commands tauchen nicht auf** – Hast du `loadCommands("./commands")` vor dem `deployCommands()` aufgerufen? Stimmen `name` und `description` im `SlashCommandBuilder`?

---

## 🤝 Mitmachen

Beiträge sind willkommen – über Issues und Pull Requests. Bitte halte dich an einen freundlichen, sachlichen Umgangston und klare Commits. 🙂

---

## 📄 Lizenz

[MIT](./LICENSE)
