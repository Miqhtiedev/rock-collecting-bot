import { CommandData } from "discord.js";
import { parseRole } from "../../utils/parseRole";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;

    const role = parseRole(args[0], message.guild);
    if (!role) {
      message.reply("Invalid role");
      return;
    }

    await client.database.server.update({
      where: {
        guildId: message.guild.id,
      },
      data: {
        joinRoleId: role.id,
      },
    });

    message.reply(`Updated join role to ${role}`);
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "setjoin role <role>",
  aliases: ["r"],
};

export default command;
