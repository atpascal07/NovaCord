import { NovaClient } from 'novacord';

const client = new NovaClient();
client.once('ready', () => console.log(`Eingeloggt als ${client.user.tag}`));
client.start();
