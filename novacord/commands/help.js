export default {
  name: "help",
  description: "Zeigt alle Commands an",
  async execute(message, args, client) {
    const cmds = client.commands.map(c => `\`${c.name}\``).join(", ");
    await message.reply(`📜 Verfügbare Commands: ${cmds}`);
  }
};
