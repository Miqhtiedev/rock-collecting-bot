import { Collection } from "discord.js";
import { Command } from "../client/command";

export const getCommand = (commands: Collection<string, Command>, name: string): Command | undefined => {
  return commands.get(name.toLowerCase()) ?? commands.find((command) => command.aliases !== undefined && command.aliases.includes(name.toLowerCase()));
};
