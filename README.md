# NovaCord

NovaCord ist ein leichtgewichtiges Discord.js Framework (ESM), inspiriert von EzCord (Python).

## Installation
```bash
npm install novacord@0.1.4```

## Nutzung
```js
import { NovaClient } from "novacord";

const client = new NovaClient();

client.on("ready", () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on("messageCreate", (msg) => client.handleMessage(msg));

client.login("DEIN_TOKEN");
```
