import { CommandData } from "discord.js";
import { parseRole } from "../../../utils/parseRole";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0]) return;

    const serverData = await client.database.server.findFirst({
      where: {
        guildId: message.guild.id,
      },
      select: {
        levelingRoles: {
          select: {
            roleId: true,
          },
        },
      },
    });

    if (!serverData) return;

    const role = parseRole(args[0], message.guild);
    if (!role) {
      const roleData = serverData.levelingRoles.find((r) => r.roleId === args[0]);
      if (roleData) {
        await client.database.levelingRole.delete({
          where: {
            guildId_roleId: { guildId: message.guild.id, roleId: roleData.roleId },
          },
        });
        message.reply(`Removed role ${roleData.roleId}`);
        return;
      }
      message.reply("Invalid role");
      return;
    }

    const roleData = serverData.levelingRoles.find((r) => r.roleId === role.id);
    if (!roleData) {
      message.reply("That role isn't assigned to a level");
      return;
    }

    await client.database.levelingRole.delete({
      where: {
        guildId_roleId: { guildId: message.guild.id, roleId: role.id },
      },
    });
    message.reply(`Removed role ${message.guild.roles.cache.get(roleData.roleId)}`);
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 1,
  usage: "level role remove <role>",
};

export default command;
