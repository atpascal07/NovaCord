# NovaCord

NovaCord ist ein Discord.js Framework, inspiriert von EzCord (Python).
Es bietet eine einfache Möglichkeit, Commands und Events für Discord-Bots zu organisieren.

## Installation
```bash
npm install novacord
```

## Verwendung
```js
const { NovaClient } = require("novacord");

const client = new NovaClient();

client.on("ready", () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on("messageCreate", (msg) => client.handleMessage(msg));

client.login("DEIN_TOKEN");
```

## Features
- Command-Handler (Ordner `commands/`)
- Blacklist-System
- Beispielcommands: `help`, `blacklist`, `statusChanger`

## Lizenz
MIT
