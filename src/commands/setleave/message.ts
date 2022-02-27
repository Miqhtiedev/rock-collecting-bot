import { CommandData } from "discord.js";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild) return;
    const leaveMessage = args.join(" ");
    await client.database.server.update({
      where: {
        guildId: message.guild.id,
      },
      data: {
        leaveMessage: leaveMessage,
      },
    });
    message.reply("Leave message updated!");
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "setleave message <message>",
  aliases: ["m"],
};

export default command;
