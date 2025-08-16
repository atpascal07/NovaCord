export default {
  name: "status",
  description: "Ändert den Status des Bots",
  async execute(message, args, client) {
    if (!args[0]) return message.reply("❌ Bitte einen neuen Status angeben.");
    await client.user.setActivity(args.join(" "), { type: 0 });
    await message.reply(`✅ Status geändert zu: ${args.join(" ")}`);
  }
};
