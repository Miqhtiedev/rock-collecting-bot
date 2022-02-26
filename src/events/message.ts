import { Message } from "discord.js";
import { handleCommand } from "../client/command";
import { Event, EventExecuteCallback } from "../client/events";

const execute: EventExecuteCallback = async (client, message: Message) => {
  if (!message.guild || message.author.bot) return;

  const guildData = await client.database.server.upsert({
    where: {
      guildId: message.guild.id,
    },
    create: {
      guildId: message.guild.id,
    },
    select: {
      prefix: true,
    },
    update: {},
  });

  const prefix = guildData.prefix.toLowerCase();
  if (!message.content.toLowerCase().startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift()?.toLowerCase();
  if (!commandName) return;

  const command = client.commands.get(commandName) ?? client.commands.find((command) => command.aliases !== undefined && command.aliases.includes(commandName));
  if (!command) return;

  handleCommand(client, command, message, args);
};

const event: Event = {
  execute: execute,
  type: "messageCreate",
};

export default event;
