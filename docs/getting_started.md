# Getting Started

```bash
npm install novacord
```

```js
import { NovaClient } from "novacord";

const client = new NovaClient({ intents: ["Guilds"] });
client.start("YOUR_TOKEN");
```