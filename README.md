# NovaCord

![NovaCord](https://raw.githubusercontent.com/atpascal07/NovaCord/main/docs/assets/logo.png)

[![](https://img.shields.io/npm/v/novacord?style=for-the-badge&logo=npm&color=cb0000&logoColor=white)](https://www.npmjs.com/package/novacord)
[![](https://img.shields.io/github/license/atpascal07/NovaCord?style=for-the-badge)](https://github.com/atpascal07/NovaCord/blob/main/LICENSE)
[![](https://img.shields.io/github/stars/atpascal07/NovaCord?style=for-the-badge&logo=github&color=181717&logoColor=white)](https://github.com/atpascal07/NovaCord)

Ein einfach zu nutzendes Framework für [discord.js](https://discord.js.org), das Boilerplate-Code reduziert und nützliche Features mitbringt.

## Features

### ✏️ Weniger Boilerplate
- Einfache Command-Struktur
- Automatisches Laden von Commands
- Utility-Funktionen

### ✨ Error Handling
- Automatisches Error Handling für Slash Commands
- Logging und Debugging Unterstützung

### 📚 Internationalisierung (i18n)
- Übersetzung für Slash Commands und Beschreibungen
- Übersetzbare Embeds, Buttons und mehr

### ⚙️ Erweiterungen
- **Help Command** – Automatische Generierung einer Hilfe-Seite
- **Status Changer** – Bot-Status zyklisch ändern
- **Blacklist** – Blockiere Nutzer vom Bot

## Installation

Node.js 18 oder höher wird benötigt.

```bash
npm install novacord
```

## Erste Schritte

```js
import { NovaClient } from "novacord";

const client = new NovaClient({
  intents: ["Guilds", "GuildMessages"]
});

client.start("YOUR_TOKEN");
```

## Nützliche Links
- [Dokumentation](https://atpascal07.github.io/NovaCord/)
- [discord.js](https://discord.js.org)
- [NPM](https://www.npmjs.com/package/novacord)

## Beispiele
Mehr Beispiele findest du im [Examples-Ordner](https://github.com/atpascal07/NovaCord/tree/main/examples).

## Contributing
Beiträge sind willkommen! Bitte schau dir den [Contribution Guide](https://atpascal07.github.io/NovaCord/contributing) an.
