import { NovaClient } from "./novacord/index.js";
import dotenv from "dotenv";
dotenv.config();

const client = new NovaClient();

client.on("ready", () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on("messageCreate", (msg) => client.handleMessage(msg));

client.login(process.env.TOKEN);
