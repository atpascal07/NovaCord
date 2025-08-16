const { NovaClient } = require('./novacord/index.js');
require('dotenv').config();

const client = new NovaClient();

client.on('ready', () => {
  console.log(`✅ Eingeloggt als ${client.user.tag}`);
});

client.on('messageCreate', (msg) => client.handleMessage(msg));

client.login(process.env.TOKEN);