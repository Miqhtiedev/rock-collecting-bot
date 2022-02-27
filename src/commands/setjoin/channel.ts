import { CommandData } from "discord.js";
import { parseChannel } from "../../utils/parseChannel";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;
    const channel = parseChannel(args[0], message.guild);
    if (!channel || !channel.isText()) {
      message.reply("Invalid channel");
      return;
    }

    await client.database.server.update({
      where: {
        guildId: message.guild.id,
      },
      data: {
        joinChannel: channel.id,
      },
    });

    message.reply(`Updated join channel to ${channel}`);
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "setjoin channel <channel>",
  aliases: ["c"],
};

export default command;
