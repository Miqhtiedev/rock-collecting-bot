import { Command } from "discord.js";

const command: Command = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;
    await client.database.server.update({
      where: {
        guildId: message.guild.id,
      },
      data: {
        prefix: args[0].toLowerCase(),
      },
    });
    message.reply(`Updated prefix to \`${args[0]}\``);
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "setprefix <prefix>",
  aliases: ["prefix"],
};

export default command;
