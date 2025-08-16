export default {
  name: "blacklist",
  description: "Fügt einen User zur Blacklist hinzu",
  async execute(message, args, client) {
    if (!args[0]) return message.reply("❌ Bitte eine User-ID angeben.");
    client.addToBlacklist(args[0]);
    await message.reply(`🚫 User ${args[0]} wurde auf die Blacklist gesetzt.`);
  }
};
