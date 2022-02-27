import { CommandData } from "discord.js";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild) return;
    const joinMessage = args.join(" ");
    await client.database.server.update({
      where: {
        guildId: message.guild.id,
      },
      data: {
        joinMessage: joinMessage,
      },
    });
    message.reply("Join message updated!");
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "setjoin message <message>",
  aliases: ["m"],
};

export default command;
