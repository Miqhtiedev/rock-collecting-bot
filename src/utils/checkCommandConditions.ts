import { Message } from "discord.js";
import { Command } from "../client/command";

export const checkCommandConditions = (command: Command, message: Message, args: string[]): boolean => {
  const requiredPermission = command.requiredPermission;
  if (requiredPermission && message.member) {
    if (!message.member.permissions.has(requiredPermission)) {
      message.reply(`You are missing permission: \`${requiredPermission}\``);
      return false;
    }
  }

  const minimumArguments = command.minimumArguments;
  if (minimumArguments && args.length < minimumArguments) {
    message.reply(`You need at least ${minimumArguments} arguments\nUsage: \`${command.usage}\``);
    return false;
  }

  return true;
};
