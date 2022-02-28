import { Guild, MessageMentions, Role } from "discord.js";

export const parseRole = (str: string, guild: Guild): Role | undefined => {
  let role = guild.roles.cache.get(str);
  if (role) return role;
  if (str.match(MessageMentions.ROLES_PATTERN)) {
    role = guild.roles.cache.get(str.slice(3, -1));
  }
  return role;
};
