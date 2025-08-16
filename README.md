# NovaCord

Ein einfach zu nutzendes Framework für [discord.js](https://discord.js.org/) (ESM).

## Installation

```bash
npm install novacord
```

## Quickstart

```js
import { NovaClient } from "novacord";

const client = new NovaClient();

client.once("ready", () => {
  console.log(`Eingeloggt als ${client.user.tag}`);
});

await client.start();
```

## Features

- 🚀 Einfache Client-Initialisierung
- 📂 Automatisches Laden von Commands
- ⚙️ Command-Deployment via Discord REST
- 🔒 Sauberes ESM-Design

## Lizenz

MIT
