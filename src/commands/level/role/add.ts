import { CommandData } from "discord.js";
import { parseRole } from "../../../utils/parseRole";

const command: CommandData = {
  run: async (client, message, args) => {
    if (!message.guild || !args[0] || !args[1]) return;

    const level = parseInt(args[0]);

    if (isNaN(level)) {
      message.reply("Invalid level number");
      return;
    }

    const role = parseRole(args[1], message.guild);
    if (!role) {
      message.reply("Invalid role");
      return;
    }

    const serverData = await client.database.server.findFirst({
      where: {
        guildId: message.guild.id,
      },
      select: {
        levelingRoles: {
          select: {
            level: true,
            roleId: true,
          },
        },
      },
    });

    if (!serverData) return;

    const existingRole = serverData.levelingRoles.find((r) => r.level === level);
    if (existingRole && message.guild.roles.cache.get(existingRole.roleId)) {
      message.reply(`That level already has a role: ${message.guild.roles.cache.get(existingRole.roleId)}`);
      return;
    }

    await client.database.levelingRole.create({
      data: {
        level: level,
        roleId: role.id,
        guildId: message.guild.id,
      },
    });

    message.reply(`Added role ${role} to level ${level}`);
  },
  requiredPermission: "ADMINISTRATOR",
  minimumArguments: 2,
  usage: "level role add <level> <role>",
};

export default command;
