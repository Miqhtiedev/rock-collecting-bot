import { GuildMember } from "discord.js";
import { Event, EventExecuteCallback } from "../client/events";
import { formatWelcomeMessage } from "../utils/formatWelcomeMessage";

const execute: EventExecuteCallback = async (client, member: GuildMember) => {
  const guildData = await client.database.server.upsert({
    where: {
      guildId: member.guild.id,
    },
    create: {
      guildId: member.guild.id,
    },
    select: {
      joinChannel: true,
      joinMessage: true,
    },
    update: {},
  });

  if (!guildData.joinChannel || !guildData.joinMessage) return;

  const channel = member.guild.channels.cache.get(guildData.joinChannel);
  if (!channel || !channel.isText()) return;

  const message = formatWelcomeMessage(guildData.joinMessage, member);

  channel.send(message);
};

const event: Event = {
  execute: execute,
  type: "guildMemberAdd",
};

export default event;
