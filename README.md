# 🌌 NovaCord

Ein leichtgewichtiges **Framework für discord.js** (ESM), das dir den Kopf frei hält von Boilerplate und dir einen **komfortablen Start** für deinen Discord-Bot ermöglicht.  
NovaCord bietet **automatisches Laden & Deployen von Slash Commands**, eine **professionelle Startmeldung in der Konsole** sowie **robustes Error-Handling**.

> 🎯 Ziel: Schnell produktiv werden, klare Struktur, weniger Kopfschmerzen.

---

## 📊 Status

[![npm version](https://img.shields.io/npm/v/novacordjs?color=blue&style=flat-square)](https://www.npmjs.com/package/novacordjs)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)
[![discord.js](https://img.shields.io/badge/discord.js-v14-blue.svg?style=flat-square)](https://discord.js.org)

---

## ✨ Features

- 🚀 **ESM-first**: `import { NovaClient } from "novacordjs";`
- 📂 **Command-Loader**: Lädt automatisch alle Commands aus einem Ordner (z. B. `./commands`).
- ⚡ **Slash-Command Deploy**: Registriere deine Commands global oder nur für einzelne Guilds.
- 🖥 **Startmeldung in der Konsole**: Übersichtliche Infos zum Bot (Name, ID, Version, Guilds, Latenz, Commands).
- 🛡 **Robustes Error-Handling**: Saubere Fehlermeldungen für User (ephemeral) & Logs in der Konsole.
- 🔑 **.env-Support**: Token, IDs & sensible Daten bleiben sauber getrennt vom Code.

---

## 📦 Installation

```bash
npm install novacordjs
```

Oder lokal für die Entwicklung:

```bash
npm install ./pfad/zu/deinem/novacordjs
```

---

## 🚀 Schnellstart

### 1️⃣ .env
```env
TOKEN=dein_discord_bot_token
CLIENT_ID=123456789012345678
# Optional:
# GUILD_ID=987654321098765432
```

### 2️⃣ index.js
```js
import { config } from "dotenv";
import { NovaClient } from "novacordjs";

config();

const client = new NovaClient();

await client.loadCommands("./commands");   // Commands laden
await client.deployCommands({              // Commands deployen
  clientId: process.env.CLIENT_ID,
  guildId: process.env.GUILD_ID            // ohne = global deploy
});

client.start();                            // Token automatisch aus .env
```

### 3️⃣ Beispiel-Command: `commands/ping.js`
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

- `new NovaClient(options?)` → Erstellt den Bot-Client.
- `client.start(token?)` → Startet den Bot (`TOKEN` aus `.env`, falls nicht angegeben).
- `client.loadCommands(dir = "./commands")` → Lädt rekursiv alle Commands.
- `client.deployCommands({ clientId, guildId? })` → Deployt die geladenen Commands.
- `client.addHelpCommand()` → Fügt automatisch ein `/help`-Command hinzu, das alle geladenen Befehle auflistet.

---

## 📋 Startmeldung (Konsole)

Beim erfolgreichen Start zeigt NovaCord eine tabellarische Übersicht:

- Bot-Tag und ID  
- discord.js-Version  
- Anzahl Commands  
- Anzahl Guilds  
- WebSocket-Latenz  

So erkennst du sofort, ob alles korrekt geladen wurde – ideal für Hoster, Docker oder Panels.

---

## 🧰 Troubleshooting

- ❌ **`Kein Bot-Token gefunden!`**  
  → Prüfe `.env` (`TOKEN`) oder übergib den Token direkt an `start(token)`.  

- ❌ **`CLIENT_ID wird benötigt`**  
  → `deployCommands()` braucht zwingend die Client-ID deiner App.  

- ❌ **Commands tauchen nicht auf**  
  → Stelle sicher, dass `loadCommands()` vor `deployCommands()` aufgerufen wurde und `SlashCommandBuilder` korrekt gesetzt ist.  

---

## 🤝 Mitmachen

Pull Requests und Issues sind willkommen!  
Bitte halte dich an klare Commit-Messages und einen respektvollen Umgangston. 🙂

---

## 📄 Lizenz

Dieses Projekt steht unter der [MIT-Lizenz](./LICENSE).
