import { GuildMember } from "discord.js";

export const formatWelcomeMessage = (message: string, member: GuildMember) => {
  const newMessage = message.replace(/{USER}/g, member.toString()).replace(/{USER_TAG}/g, member.user.tag);
  return newMessage;
};
