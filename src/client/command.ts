import { Client, Collection, Message, PermissionString } from "discord.js";
import fs from "fs";
import path from "path";
import invariant from "tiny-invariant";
import { checkCommandConditions } from "../utils/checkCommandConditions";

type CommandRunCallback = (client: Client, message: Message, args: string[]) => void;

export interface Command {
  run: CommandRunCallback;
  usage: string;
  requiredPermission?: PermissionString;
  minimumArguments?: number;
  aliases?: string[];
  subcommands?: Collection<string, Command>;
  defaultSubcommand?: boolean;
}

export const registerCommands = (client: Client, commandsDirectory: string) => {
  client.commands = registerDirectory(commandsDirectory);
  function registerDirectory(dir: string): Collection<string, Command> {
    const commands: Collection<string, Command> = new Collection();
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const stats = fs.statSync(path.join(dir, file));
      if (stats.isFile() && file.toLowerCase().endsWith(".js")) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const command: Command = require(path.join(dir, file)).default;
        const name = file.split(".")[0]?.toLowerCase();
        invariant(name, `Invalid file name at: ${path.join(dir, file)}`);
        commands.set(name, command);
      } else if (stats.isDirectory()) {
        const subcommands = registerDirectory(path.join(dir, file));
        const command: Command = {
          usage: "",
          subcommands: subcommands,
          run: (client, message, args) => handleCommand(client, command, message, args),
        };
        commands.set(file.toLowerCase(), command);
      }
    }
    return commands;
  }
};

export const handleCommand = (client: Client, command: Command, message: Message, args: string[]) => {
  const subcommand = args[0] ? command.subcommands?.get(args[0].toLowerCase()) : undefined;
  if (subcommand) {
    args.shift();
    subcommand.run(client, message, args);
    return;
  }

  const defaultSubcommand = command.subcommands?.find((command) => command.defaultSubcommand ?? false);
  if (defaultSubcommand) {
    const meetsConditions = checkCommandConditions(defaultSubcommand, message, args);
    if (meetsConditions) {
      defaultSubcommand.run(client, message, args);
    }
    return;
  }

  const meetsConditions = checkCommandConditions(command, message, args);
  if (meetsConditions) {
    command.run(message.client, message, args);
  }
};
